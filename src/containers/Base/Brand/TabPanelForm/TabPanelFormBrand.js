import React, { useContext, useMemo, useState, useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Button, Checkbox, Divider, message } from 'antd';

import HeaderBar from '../../../../components/HeaderBar';

import { ButtonGroup } from '../../../../components/Styles/ButtonStyles';
import { BlockTitle, Column, InputTitle, JobTitle, Medium } from '../../../../components/Styles/StyledBlocks';
import { TitleLogo } from '../../../../components/Styles/ComponentsStyles';
import {
  Chip,
  DesignList,
  DesignListItem,
  DropdownBtn1,
  StyledButton,
  HeaderWrapper,
  HeaderTitleWrapper,
  StyledInput,
  StyledSelect,
} from '../../../../components/Styles/DesignList/styles';
import useDebounce from '../../../../containers/Administration/components/useDebounce';

import printerIcon from '../../../../img/header-bar/printer.svg';
import chipIcon from '../../../../img/chip-icon.svg';
import owner from '../../../../img/input/owner.svg';
import suitcase from '../../../../img/input/suitcase.svg';
import deleteIcon from '../../../../img/outdoor_furniture/red_can.svg';
import hyperlink from '../../../../img/hyperlink.svg';
import designIcon from '../../../../img/brand/design-icon.png';

import { constructBrand } from '../Brand';
import { useParams } from 'react-router';

const PrintBlock = React.forwardRef(({ data }, ref) => (
  <div ref={ref}>
    <img
      src={data.img ? `${process.env.REACT_APP_BACKEND_URL.replace('/api/', '')}/media/${data.img}` : designIcon}
      alt="design item"
    />
    <p>{data.title}</p>
    <p>Создан: {data.startedAt}</p>
  </div>
));
const PrintListBlock = React.forwardRef(({ data }, ref) => (
  <div key={data.id} style={{ display: 'flex' }} ref={ref}>
    <div style={{ marginRight: 10, marginBottom: 10 }}>{data.map((item) => item)}</div>
  </div>
));

const DESIGN_LIST = gql`
  query searchDesign {
    searchDesign {
      edges {
        node {
          id
          img
          isCurrent
          startedAt
          title
        }
      }
    }
  }
`;
const DELETE_DESIGN = gql`
  mutation deleteDesign($id: ID!) {
    deleteDesign(id: $id) {
      found
    }
  }
`;

const WORKING_SECTOR_LIST = gql`
  query searchWorkingSector {
    searchWorkingSector {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
const SEARCH_PARTNER = gql`
  query searchPartner($title_Icontains: String) {
    searchPartner(title_Icontains: $title_Icontains) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

const SAVE_BRAND = gql`
  mutation updateBrand($id: ID!, $title: String, $workingSector: ID, $partners: [ID]) {
    updateBrand(id: $id, input: { title: $title, workingSector: $workingSector, partners: $partners }) {
      brand {
        id
      }
    }
  }
`;

const InnerForm = () => {
  const { id } = useParams();
  const [brandData, setBrandData] = useContext(constructBrand);
  const [workingSectors, setWorkingSectors] = useState(null);
  const inputRef = useRef([]);

  const [designList, setDesignList] = useState(null);
  const [printArray, setSetPrintArray] = useState(null);

  const [partnerValue, setPartnerValue] = useState(undefined);
  const [partnersQueried, setPartnersQueried] = useState((brandData.partners && brandData.partners.edges) || []);
  const [partnerSearchText, setPartnerSearchText] = useState('');
  const [partnerLoading, setPartnerLoading] = useState(false);

  const workingSectorResponse = useQuery(WORKING_SECTOR_LIST);
  const [saveDataBrand] = useMutation(SAVE_BRAND);
  const [getPartner, { loading, data }] = useLazyQuery(SEARCH_PARTNER);
  const designData = useQuery(DESIGN_LIST);
  const debouncedSearchTerm = useDebounce(partnerSearchText, 500);
  const [deleteDesign] = useMutation(DELETE_DESIGN);

  useEffect(() => {
    if (workingSectorResponse.data && workingSectorResponse.data.searchWorkingSector) {
      setWorkingSectors(workingSectorResponse.data.searchWorkingSector.edges);
    }
  }, [workingSectorResponse.data]);

  useEffect(() => {
    getPartner({ variables: { title_Icontains: debouncedSearchTerm } });
    setPartnerLoading(loading);
  }, [debouncedSearchTerm, getPartner, loading]);

  useEffect(() => {
    if (data && data.searchPartner.edges) {
      setPartnerLoading(loading);
      if (!loading) {
        setPartnersQueried(data.searchPartner.edges);
      }
    }
  }, [data, loading]);

  useEffect(() => {
    const { data } = designData;
    const localDesignList =
      designData.data &&
      designData.data.searchDesign &&
      designData.data.searchDesign.edges.map(({ node }) => ({
        node: {
          ...node,
          isChecked: false,
        },
      }));

    setDesignList(localDesignList);
  }, [designData.data]);

  const addPartnerToBrand = (e) => {
    e.preventDefault();

    if (partnerValue) {
      if (brandData.partners && brandData.partners.edges.filter((item) => item.node.id === partnerValue.id)[0]) {
        alert('Этот контрагент уже добавлен');
        return;
      }
      console.log(partnerValue);

      let localNewNode = partnersQueried.filter((item) => item.node.id === partnerValue);
      const localEdges = brandData.partners ? [...brandData.partners.edges, ...localNewNode] : [...localNewNode];

      let newBrandData = {
        ...brandData,
        partners: {
          edges: localEdges,
        },
      };

      setBrandData(newBrandData);
      saveData(newBrandData);
    }
  };
  const removePartnerFromBrand = (e, id) => {
    e.preventDefault();

    let localEdges = brandData.partners ? brandData.partners.edges : [];

    localEdges = localEdges.filter((item) => item.node.id !== id);
    let newBrandData = {
      ...brandData,
      partners: {
        edges: localEdges,
      },
    };

    setBrandData(newBrandData);
    saveData(newBrandData);
  };
  const saveData = (paramBrandData = null) => {
    if (!id) return;
    let localBrandData = paramBrandData || brandData;

    let partnerIdList = [];
    if (localBrandData.partners && localBrandData.partners.edges) {
      partnerIdList = localBrandData.partners.edges.map((item) => item.node.id);
    }

    saveDataBrand({
      variables: {
        id: id,
        title: localBrandData.title,
        workingSector: localBrandData.workingSector && localBrandData.workingSector.id,
        partners: partnerIdList,
      },
    }).then(() => {
      message.success('Успешно сохранено.');
    });
  };

  const selectDesign = (index, isChecked) => {
    let localDesignList = designList;
    localDesignList[index].node.isChecked = isChecked.target.checked;

    const printArray = localDesignList
      .filter(({ node }) => node.isChecked)
      .map(({ node }) => <PrintBlock key={node.id} data={node} />);

    setDesignList(localDesignList);
    setSetPrintArray({
      element: <PrintListBlock data={printArray} ref={(el) => (inputRef.current['printListBlocks'] = el)} />,
      refData: inputRef,
    });
  };
  const deleteSide = (id) => {
    let localDesignList = designList.filter(({ node }) => node.id !== id);

    setDesignList(localDesignList);

    deleteDesign({ variables: { id } });
  };

  return (
    <form style={{ width: '100%' }}>
      <HeaderWrapper>
        <HeaderTitleWrapper>
          <TitleLogo />
          <JobTitle>Бренд - {brandData.title && brandData.title}</JobTitle>
        </HeaderTitleWrapper>
        <ButtonGroup>
          <StyledButton backgroundColor="#008556" type="button" onClick={(e) => saveData()}>
            Сохранить
          </StyledButton>
          <StyledButton backgroundColor="#2C5DE5" type="button">
            Выгрузить данные
          </StyledButton>
        </ButtonGroup>
      </HeaderWrapper>
      <div>
        <Grid fluid className="resetPadding" style={{ padding: 0 }}>
          <Row xs={12}>
            <Col xs={5}>
              <Medium>
                <BlockTitle>Редактирование информации</BlockTitle>
                <div className="block-edit-info">
                  <Row>
                    <Column style={{ width: '45%', marginRight: '30px' }}>
                      <Row style={{ padding: '0' }}>
                        <div style={{ width: '100%' }}>
                          <InputTitle>Наименование</InputTitle>
                          <StyledInput
                            prefix={<img src={suitcase} />}
                            value={brandData.title ? brandData.title : ''}
                            onChange={(e) => {
                              setBrandData({ ...brandData, title: e.target.value });
                            }}></StyledInput>
                        </div>
                      </Row>
                    </Column>
                    <Column style={{ width: '45%', marginBottom: 'auto' }}>
                      <div style={{ width: '100%' }}>
                        <InputTitle>Сектор деятельности</InputTitle>
                        <StyledSelect
                          prefix={<img src={owner} />}
                          defaultValue={brandData.workingSector ? brandData.workingSector.id : ''}
                          loading={workingSectorResponse.loading}
                          onChange={(value) =>
                            setBrandData({
                              ...brandData,
                              workingSector: {
                                ...brandData.workingSector,
                                id: value,
                              },
                            })
                          }>
                          {workingSectors &&
                            workingSectors.map(({ node }) => (
                              <StyledSelect.Option key={node.id} value={node.id}>
                                {node.title}
                              </StyledSelect.Option>
                            ))}
                        </StyledSelect>
                      </div>
                    </Column>
                  </Row>
                  <Divider />
                  <Row style={{ paddingBottom: '15px' }}>
                    <Column style={{ width: '100%' }}>
                      <div
                        style={{
                          width: '100%',
                          marginBottom: '5px',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'flex-end',
                          justifyContent: 'space-between',
                        }}>
                        <div style={{ width: '80%' }}>
                          <InputTitle>Контрагенты</InputTitle>
                          <StyledSelect
                            showSearch
                            value={partnerValue}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            onSearch={(value) => setPartnerSearchText(value)}
                            onChange={(value) => setPartnerValue(value)}
                            notFoundContent={null}
                            loading={partnerLoading}>
                            {partnersQueried &&
                              partnersQueried.map(({ node }) => (
                                <StyledSelect.Option key={node.id} value={node.id}>
                                  {node.title ? node.title : 'Нет названия'}
                                </StyledSelect.Option>
                              ))}
                          </StyledSelect>
                        </div>
                        <StyledButton backgroundColor="#008556" type="button" onClick={addPartnerToBrand}>
                          Добавить
                        </StyledButton>
                      </div>
                      <div style={{ width: '80%', display: 'flex', flexWrap: 'wrap' }}>
                        {brandData.partners &&
                          brandData.partners.edges.map(({ node }) => (
                            <Chip key={node.id}>
                              <img src={chipIcon} alt="icon" onClick={(e) => removePartnerFromBrand(e, node.id)} />
                              <span>{node.title}</span>
                            </Chip>
                          ))}
                      </div>
                    </Column>
                  </Row>
                </div>
              </Medium>
              <style>
                {`
                  .block-edit-info .row {
                    margin: 0;
                    padding: 20px;
                  }
                  .block-edit-info .ant-divider-horizontal {
                    margin: 0;
                  }
                `}
              </style>
            </Col>
            <Col xs={7}>
              <HeaderBar enableEditQuantityOfColumns={true} printData={printArray}>
                <DropdownBtn1 className="dropdown-btn-1" style={{ marginLeft: '17px' }}>
                  <img src={hyperlink} alt="dropdown logod" className="dropdown-btn-1__logo" />
                  <h6 className="dropdown-btn-1__title">Архив дизайнов</h6>
                </DropdownBtn1>
              </HeaderBar>

              <DesignList className="design-list">
                {designList &&
                  designList.map(({ node }, index) => (
                    <DesignListItem
                      key={node.id}
                      className={`design-list__item ${node.isCurrent ? 'current-design' : 'archive-design'}`}>
                      <div style={{ display: 'none' }}>
                        <PrintBlock data={node} ref={(el) => (inputRef.current[index] = el)} />
                      </div>
                      <div className="design-list__item-b-image">
                        <img
                          src={
                            node.img
                              ? `${process.env.REACT_APP_BACKEND_URL.replace('/api/', '')}/media/${node.img}`
                              : designIcon
                          }
                          alt="design icon"
                          className="design-list__item-image"
                        />
                        <p className="design-list__item-label">{node.isCurrent ? 'текущий дизайн' : 'архив'}</p>
                      </div>
                      <h6 className="design-list__item-title">
                        <span>{node.title}</span>
                      </h6>
                      <div className="design-list__item-footer">
                        <Checkbox defaultValue={node.isChecked} onChange={(e) => selectDesign(index, e)}>
                          Выбрать
                        </Checkbox>
                        <div className="design-list__item-btn-group">
                          <ReactToPrint
                            trigger={() => (
                              <Button className="design-list__item-btn" type="button">
                                <img src={printerIcon} />
                              </Button>
                            )}
                            content={() => inputRef.current[index]}
                          />
                          <Button className="design-list__item-btn" type="button" onClick={() => deleteSide(node.id)}>
                            <img src={deleteIcon} />
                          </Button>
                        </div>
                      </div>
                    </DesignListItem>
                  ))}
              </DesignList>
            </Col>
          </Row>
        </Grid>
      </div>
    </form>
  );
};

export default InnerForm;
