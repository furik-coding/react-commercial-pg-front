import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import moment from 'moment';
import styled from 'styled-components';
import {DatePicker, message, Upload} from 'antd';

import { agreementContext } from '../Agreement';

import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../../components/Styles/StyledBlocks';
import { StyledInput, StyledSelect, StyledButton } from '../../../../../components/Styles/DesignList/styles';
import SearchSelect from '../../../../../components/SearchSelect';

import anchorIcon from '../../../../../img/input/anchor.svg';
import ownerIcon from '../../../../../img/input/owner.svg';
import portfolioIcon from '../../../../../img/input/portfolio.svg';
import contractIcon from '../../../../../img/input/contract.svg';

const SEARCH_PARTNER = gql`
  query searchPrther(
    $title_Icontains: String
  ) {
    searchPartner(
      title_Icontains: $title_Icontains
    ) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
const SEARCH_CONTRACT_TYPE = gql`
  query searchContractType(
    $name_Icontains: String
  ) {
    searchContractType(
      name_Icontains: $name_Icontains
    ) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
const SEARCH_CREATORS = gql`
  query searchUser(
    $name_Icontains: String
  ) {
  searchUser(
    name_Icontains: $name_Icontains
    ) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
const SEARCH_INITIATORS = gql`
  query searchUser(
    $id: ID!
    $initiator_Name_Icontains: String
  ) {
    searchUser(id: $id) {
      initiatedContracts(
        initiator_Name_Icontains: $initiator_Name_Icontains
      ) {
        edges {
          node {
            id
            initiator {
              id
              name
            }
          }
        }
      }
    }
}
`;
const UPLOAD_CONTRACT = gql`
  mutation updateContract(
    $id: ID!
    $contractPdf: Upload
  ) {
    updateContract(
      id: $id
      input: {
        contractPdf: $contractPdf
      }
    ) {
      contract {
        id
        contractPdf
      }
    }
  }
`;
const UPLOAD_AGREEMENT = gql`
  mutation updateContract(
      $id: ID!
      $additionallyAgreementPdf: Upload
  ) {
    updateContract(
      id: $id
      input: {
        additionallyAgreementPdf: $additionallyAgreementPdf
      }
    ) {
      contract {
        id
        additionallyAgreementPdf
      }
    }
  }
`;

export const EditInformation = () => {
  const { id } = useParams();

  const [item, setItem] = useContext(agreementContext);

  const [contractList, setContractList] = useState([]);
  const [agreementList, setAgreementList] = useState([]);

  const [getPartner, partnerInfo] = useLazyQuery(SEARCH_PARTNER);
  const [getContractType, contractTypeInfo] = useLazyQuery(SEARCH_CONTRACT_TYPE);
  const [getCreators, creatorsInfo] = useLazyQuery(SEARCH_CREATORS);
  const [getInitiators, initiatorsInfo] = useLazyQuery(SEARCH_INITIATORS);
  const [uploadContract] = useMutation(UPLOAD_CONTRACT);
  const [uploadAgreement] = useMutation(UPLOAD_AGREEMENT);

  useEffect(() => {
    console.log('item ', item)
  }, [item]);

  useEffect(() => {
    if(item.contractPdf) {
      setContractList([{
        uid: '-1',
        name: item.contractPdf.replace('contract/', ''),
        status: 'done',
        url: `${process.env.REACT_APP_BACKEND_URL.replace('/api/', '')}/media/${item.contractPdf}`,
      }])
    }
    if(item.additionallyAgreementPdf) {
      setAgreementList([{
        uid: '-1',
        name: item.additionallyAgreementPdf.replace('contract/', ''),
        status: 'done',
        url: `${process.env.REACT_APP_BACKEND_URL.replace('/api/', '')}/media/${item.additionallyAgreementPdf}`,
      }])
    }
  }, [item.contractPdf, item.additionallyAgreementPdf]);

  const uploadDocContract = (info) => {
    uploadContract({
      variables: {
        id: id,
        contractPdf: info.file
      }
    })
      .then((res) => {
        const url = res.data.updateContract.contract.contractPdf;

        setItem({
          ...item,
          contractPdf: url
        })

        let contractList = [{
          uid: '-1',
          name: info.file.name,
          status: 'done',
          url: `${process.env.REACT_APP_BACKEND_URL.replace('/api/', '')}/media/${url}`,
        }];

        setContractList(contractList);
        message.success('File uploaded successfully');
      })
      .catch((error) => {
        message.error('Is not a upload');
        console.error(error);
      })
  }
  const removeDocContract = () => {
    uploadContract({
      variables: {
        id: id,
        contractPdf: null
      }
    })
      .then((res) => {
        const url = res.data.updateContract.contract.contractPdf;

        setItem({
          ...item,
          contractPdf: url
        })

        setContractList([]);
        message.success('File deleted successfully');
      })
      .catch((error) => {
        message.error('Something went wrong');
        console.error(error);
      })
  }
  const uploadAgreementContract = (info) => {
    uploadAgreement({
      variables: {
        id: id,
        additionallyAgreementPdf: info.file
      }
    })
      .then((res) => {
        const url = res.data.updateContract.contract.additionallyAgreementPdf;

        setItem({
          ...item,
          additionallyAgreementPdf: url
        })

        let agreementList = [{
          uid: '-1',
          name: info.file.name,
          status: 'done',
          url: `${process.env.REACT_APP_BACKEND_URL.replace('/api/', '')}/media/${url}`,
        }];

        setAgreementList(agreementList);
        message.success('File uploaded successfully');
      })
      .catch((error) => {
        message.error('Is not a upload');
        console.error(error);
      })
  }
  const removeAgreementContract = () => {
    uploadAgreement({
      variables: {
        id: id,
        additionallyAgreementPdf: null
      }
    })
      .then((res) => {
        const url = res.data.updateContract.contract.additionallyAgreementPdf;

        setItem({
          ...item,
          additionallyAgreementPdf: url
        })

        setAgreementList([]);
        message.success('File deleted successfully');
      })
      .catch((error) => {
        message.error('Something went wrong');
        console.error(error);
      })
  }

  const uploadContractConfig = {
    name: 'file',
    customRequest(info) {
      uploadDocContract(info);
    },
    onRemove() {
      removeDocContract();
    }
  };
  const uploadAgreementConfig = {
    name: 'file',
    customRequest(info) {
      uploadAgreementContract(info);
    },
    onRemove() {
      removeAgreementContract();
    }
  };

  return (
    <Medium>
          <BlockTitle>Редактирование информации</BlockTitle>
          <BlockBody>
            <Row>
            <SearchItem>
                <InputTitle>Наименование контрагента</InputTitle>
                <SearchSelect
                  value={item.partnerId ? item.partnerId : (item.partner && item.partner.id)}
                  defaultValue={<img src={portfolioIcon} alt={"Наименование контрагента"}/>}
                  icon={portfolioIcon}
                  nestedField="title"
                  onChange={(value) => setItem({
                    ...item,
                    partnerId: value
                  })}
                  getData={(value) => getPartner({
                    variables: {
                      title_Icontains: value
                    }
                  })}
                  responseDataInfo={partnerInfo}
                  nameOfQuery="searchPartner"
                />
            </SearchItem>
            <SearchItem>
                <InputTitle>Дата заключения</InputTitle>
                <DatePicker placeholder="01/01/2020"
                  size={'large'}
                  format='DD/MM/YYYY'
                  style={{  width: '100%' }}
                  defaultValue={item.registrationDate ? moment(item.registrationDate) : ''}
                  onChange={(date) => setItem({ ...item, registrationDate: new Date(date) })}
                  />
              </SearchItem>
            </Row>
            <Row>
              <SearchItem>
                <InputTitle>Начало действия</InputTitle>
                <DatePicker placeholder="01/01/2020"
                size={'large'}
                format='DD/MM/YYYY'
                style={{  width: '100%' }}
                defaultValue={item.start ? moment(item.start) : ''}
                onChange={(date) => setItem({ ...item, start: new Date(date) })}
                />
              </SearchItem>
              <SearchItem>
                <InputTitle>Окончание действия</InputTitle>
                <DatePicker placeholder="01/01/2020"
                  size={'large'}
                  format='DD/MM/YYYY'
                  style={{  width: '100%' }}
                  defaultValue={item.end ? moment(item.end) : ''}
                  onChange={(date) => setItem({ ...item, end: new Date(date) })}
                  />
              </SearchItem>
            </Row>
            <Row>
              <SearchItem>
                <InputTitle>Создатель</InputTitle>

                <SearchSelect
                  value={item.creatorId ? item.creatorId : (item.creator && item.creator.id)}
                  defaultValue={<img src={ownerIcon} alt={"Создатель"}/>}
                  icon={ownerIcon}
                  nestedField="name"
                  onChange={(value) => setItem({
                    ...item,
                    creatorId: value
                  })}
                  getData={(value) => getCreators({
                    variables: {
                      name_Icontains: value
                    }
                  })}
                  responseDataInfo={creatorsInfo}
                  nameOfQuery="searchUser"
                />
              </SearchItem>
              <SearchItem>
                <InputTitle>Инициатор</InputTitle>

                <SearchSelect
                  value={item.initiatorId ? item.initiatorId : (item.initiator && item.initiator.id)}
                  defaultValue={<img src={ownerIcon} alt={"Инициатор"}/>}
                  icon={ownerIcon}
                  nestedField="name"
                  onChange={(value) => setItem({
                    ...item,
                    initiatorId: value
                  })}
                  getData={(value) => getInitiators({
                    variables: {
                      id: item.creatorId ? item.creatorId : (item.creator && item.creator.id),
                      initiator_Name_Icontains: value
                    }
                  })}
                  responseDataInfo={initiatorsInfo}
                  nameOfQuery="searchUser"
                  flagSearchInitiator={true}
                />
              </SearchItem>
            </Row>
            <Row>
              <SearchItem>
                <InputTitle>Тип договора</InputTitle>
                <SearchSelect
                  placeholder="С поставщиком"
                  value={item.contractTypeId ? item.contractTypeId : (item.contractType && item.contractType.id)}
                  defaultValue={<img src={contractIcon} alt={"С поставщиком"}/>}
                  icon={contractIcon}
                  nestedField="name"
                  onChange={(value) => setItem({
                    ...item,
                    contractTypeId: value
                  })}
                  getData={(value) => getContractType({
                    variables: {
                      name_Icontains: value
                    }
                  })}
                  responseDataInfo={contractTypeInfo}
                  nameOfQuery="searchContractType"
                />
              </SearchItem>
              <SearchItem>
                <InputTitle>Срок оплаты</InputTitle>
                <DatePicker
                  placeholder="01/01/2020"
                  size={'large'}
                  format='DD/MM/YYYY'
                  style={{  width: '100%' }}
                  defaultValue={item.paymentDate ? moment(item.paymentDate) : ''}
                  onChange={(date) => setItem({ ...item, paymentDate: new Date(date) })}
                />
              </SearchItem>
            </Row>
            <Row>
              <SearchItem>
                <InputTitle>Подписант в именительном падеже</InputTitle>
                <StyledInput
                  placeholder="Подписант в именительном падеже"
                  prefix={<img src={ownerIcon} alt={"Подписант в именительном падеже"}/>}
                  defaultValue={item.signatoryOne ? item.signatoryOne : ""}
                  onChange={(e) => setItem({ ...item, signatoryOne: e.target.value})}
                />
              </SearchItem>
              <SearchItem>
                <InputTitle>Подписант в родительном падеже</InputTitle>
                <StyledInput
                placeholder="Подписант в родительном падеже"
                prefix={<img src={ownerIcon} alt={"Подписант в родительном падеже"}/>}
                defaultValue={item.signatoryTwo ? item.signatoryTwo : ""}
                onChange={(e) => setItem({ ...item, signatoryTwo: e.target.value})}
                />
              </SearchItem>
            </Row>
            <Row>
              <SearchItem>
                <InputTitle>На основании какого документа действует подписант?</InputTitle>
                <StyledInput
                  placeholder="Документ"
                  prefix={<img src={anchorIcon} alt={"На основании какого документа действует подписант"}/>}
                  defaultValue={item.basedOnDocument ? item.basedOnDocument : ""}
                  onChange={(e) => setItem({ ...item, basedOnDocument: e.target.value})}
              ></StyledInput>
              </SearchItem>
              <SearchItem>
              <InputTitle>Статус возврата</InputTitle>
              <StyledSelect
                placeholder="Нет"
                defaultValue={item.returnStatus ? item.returnStatus : <img src={anchorIcon} alt={"Статус возврата"}/>}
                onChange={(value) => setItem({ ...item, returnStatus: value})}
              >
                <StyledSelect.Option  value={true}>
                  <img src={anchorIcon} alt={"Да"}/>
                  <span>Да</span>
                </StyledSelect.Option>
                <StyledSelect.Option  value={false}>
                  <img src={anchorIcon} alt={"Нет"}/>
                  <span>Нет</span>
                </StyledSelect.Option>
              </StyledSelect>
            </SearchItem>
            </Row>
            <Row>
            <SearchItem style={{width:"100%"}}>
            <InputTitle>Документы</InputTitle>
            <StyledUpload
              {...uploadContractConfig}
              fileList={contractList}
              listType="text"
            >
              <StyledButton
                backgroundColor="#2C5DE5"
                type="button"
                style={{width:"260px"}}
              >
                Загрузить скан  договора (.pdf)
              </StyledButton>
            </StyledUpload>
            <br/>
            <StyledUpload
              {...uploadAgreementConfig}
              fileList={agreementList}
              listType="text"
            >
              <StyledButton
                backgroundColor="#2C5DE5"
                type="button"
              >
                Загрузить доп соглашение (.pdf)
              </StyledButton>
          </StyledUpload>
          </SearchItem>
          </Row>
            <Row>
              <SearchItem style={{width:"100%"}}>
                <InputTitle>Комментарий</InputTitle>
                <StyledInput.TextArea rows={3}
                  placeholder="..."
                  defaultValue={item.comment ? item.comment : ""}
                  onChange={(e) => setItem({ ...item, comment: e.target.value})}
                  size={'large'}
                />
              </SearchItem>
          </Row>
      </BlockBody>
    </Medium>
  );
};

export default EditInformation;
const SearchItem = styled.div`
  display: flex;
  flex-direction: column;

  width:48%;
  .ant-form-item{
    margin-bottom:0;
  }
`;
const StyledUpload= styled(Upload)`
width: 100%;
display:flex;
justify-content:space-between;
`;
