import React, { useState, useEffect, useMemo, useContext } from 'react';
import styled from 'styled-components';
import { Checkbox, DatePicker, Form, message } from 'antd';
import useDebounce from '../../Administration/components/useDebounce';
import date from '../../../img/left-bar/filter/date.svg';
import inputIcon from '../../../img/sales/projectNameInput.svg';
import { SubmitButton } from '../../../components/Styles/ButtonStyles';
import { SlidingBottomPanel } from '../../../components/SlidingBottomPanel/SlidingBottomPanel';
import { CRUDForm } from '../../../components/SlidingBottomPanel/CRUDForm';
import { SliderCellColRaw, SliderRow } from '../../../components/SlidingBottomPanel/PanelComponents';
import { gql, useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { StyledSelect } from '../../../components/Styles/DesignList/styles';
import { adverContext } from './AdvertisingParties';

const InputIconSpanSyled = styled.span`
  position: absolute;
  transform: translate(55%, 30%);
  z-index: 99;
`;

const InputIcon = ({ img, alt }) => {
  return (
    <InputIconSpanSyled>
      <img src={img} alt={alt} />
    </InputIconSpanSyled>
  );
};

// TODO: Сделать подстановку количества броней крансым
// {/*<span*/}
// {/*  style={{*/}
// {/*    color: '#D42D11',*/}
// {/*    fontWeight: 'bold',*/}
// {/*  }}>*/}
// {/*    (24 шт.)*/}
// {/*  </span>*/}

// Ок
const DateStateText = styled.p`
  color: #2c5de5;
  fontsize: 14px;
  fontweight: bold;
  margin: 0;
`;

const ReservationSilderFormItem = styled(Form.Item)`
  display: flex;
  flexdirection: column;
  maxwidth: 300px;
  width: 100%;
`;

const ReservationSilderCheckboxesFormItem = styled(Form.Item)`
  display: flex;
  flex-direction: column;
  max-width: 220px;
  width: 100%;
  min-width: 220px;
`;

const ReservationSliderSubmitButton = styled(SubmitButton)`
  margin-top: 2.5rem;
  margin-left: 2rem;
  fontweight: bold;
`;

export function ReservationSlider({ sliderState }) {
  // const addItem = (values) => {
  //   let parent = sliderState.caller.parent;
  //   let cb = (result) => sliderState.caller.showCRUDMessageAndRefetch(result, "Добавление");
  //   if (parent) {
  //     sliderState.caller.src.apiAdd({
  //       id: parent.selected.key,
  //       title: values.name
  //     }, cb)
  //   }
  //   else {
  //     sliderState.caller.src.apiAdd({ title: values.name }, cb)
  //   }
  // };
  let [form] = Form.useForm();

  const {chartItems, setResCreated} = useContext(adverContext);
  const [projectSearchText, setProjectSearchText] = useState('');
  const [projectLoading, setProjectLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(projectSearchText, 500);
  const [projectData, setProjectData] = useState([]);
  const [projectValue, setProjectValue] = useState(undefined);
  const [resTypes, setResTypes] = useState([]);
  const [selectedSides, setSelectedSides] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const getSelected = (items) => {
    let dst = [];
    if (items) {
      for (let item of items) {
        if (item.isSelected) {
          dst.push(item.content);
        }
      }
    }
    return dst;
  };

  useEffect(() => {
    const selected = getSelected(chartItems);
    setSelectedSides(selected);
    console.log('ssss');
  }, [setSelectedSides, chartItems]);

  const PROJECTS_QUERY = gql`
    query searchProjects($title_Icontains: String) {
      searchProject(title_Icontains: $title_Icontains) {
        edges {
          node {
            title
            code
            id
            agencyCommission {
              percent
              value
            }
            projectAttachments {
              edges {
                node {
                  id
                }
              }
            }
            additionalCostsNonrts {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;

  const RESERVATION_TYPE_QUERY = gql`
    {
      searchReservationType {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;

  const CREATE_RESERVATION = gql`
    mutation CreateReservation($input: CreateReservationInput!) {
      createReservation(input: $input) {
        reservation {
          project {
            brand {
              title
            }
          }
        }
      }
    }
  `;

  const [createReservation] = useMutation(CREATE_RESERVATION);
  const [getProject, { loading, data }] = useLazyQuery(PROJECTS_QUERY);
  const loadResTypes = useQuery(RESERVATION_TYPE_QUERY);
  const handleSearchProject = (value) => {
    setProjectSearchText(value);
  };
  const handleChangeProject = (value) => {
    setProjectValue(value);
  };

  if (loadResTypes.data && !resTypes.length) {
    setResTypes(loadResTypes.data.searchReservationType.edges);
  }

  useEffect(() => {
    getProject({
      variables: {
        code_Icontains: debouncedSearchTerm,
      },
    });
    setProjectLoading(loading);
  }, [debouncedSearchTerm, getProject, loading]);

  useMemo(() => {
    if (data && data.searchProject.edges) {
      setProjectData(data.searchProject.edges);
      setProjectLoading(loading);
    }
  }, [data, loading]);

  return (
    <SlidingBottomPanel
      title={`Быстрая бронь ${sliderState.title[0]}`}
      onClose={sliderState.closeAdd}
      classNameSuffix={'loca'}
      sliderClass="advertising-part-slider">
      <CRUDForm
        form={form}
        onFinish={(values) => {
          form.validateFields().then(() => {
            setConfirmLoading(true);

            const createRes = selectedSides.map((side) => {
              let input = {
                dateFrom: values.startDate[0].toDate(),
                dateTo: values.startDate[1].toDate(),
                project: values.projectName,
                branding: values.additional,
                reservationType: values.reservationType,
                constructionSide: side,
                agencyCommission: {},
              };
              return createReservation({
                variables: {
                  input,
                },
              });
            });

            console.log(values);
            Promise.all(createRes)
              .then(() => {
                setConfirmLoading(false);
                setResCreated(true);
                sliderState.closeAdd();
                message.success('Успешно добавлено!');
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }}>
        <SliderRow>
          <SliderCellColRaw {...{ xxl: 8, xl: 10, xs: 10 }}>
            <div
              style={{
                display: 'flex',
              }}>
              <p
                className="formItem-title"
                style={{
                  width: '50%',
                }}>
                Дата начала
              </p>
              <p className="formItem-title">Дата оканчания</p>
            </div>
            <InputIcon img={date} alt="date icon" />
            <ReservationSilderFormItem
              name="startDate"
              rules={[{ required: true, message: 'Пожалуйста укажите период.' }]}>
              <DatePicker.RangePicker
                dropdownAlign={{
                  points: ['bl', 'tl'],
                  offset: [0, -4],
                  overflow: {
                    adjustX: 0,
                    adjustY: 1,
                  },
                }}
                className="date-picker"
                suffixIcon={<DateStateText>Ок</DateStateText>}
                size={'large'}
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
              />
            </ReservationSilderFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{ xxl: 4, xl: 4, xs: 7 }}>
            <p className="formItem-title">Проект</p>
            <InputIcon img={inputIcon} alt="input icon" />
            <ReservationSilderFormItem
              name="projectName"
              rules={[{ required: true, message: 'Пожалуйста выберите проект.' }]}>
              <StyledSelect
                showSearch
                showArrow={false}
                filterOption={false}
                size="large"
                // notFoundContent={null}
                className="projectSearchInput"
                placeholder="Название проекта"
                value={projectValue}
                dropdownAlign={{
                  points: ['bl', 'tl'],
                  offset: [0, -4],
                  overflow: {
                    adjustX: 0,
                    adjustY: 1,
                  },
                }}
                onSearch={handleSearchProject}
                onChange={handleChangeProject}
                loading={projectLoading}>
                {projectData &&
                  projectData.map(({ node }) => (
                    <StyledSelect.Option key={node.id} value={node.id}>
                      {node.code ? node.code : 'Нет названия'}
                    </StyledSelect.Option>
                  ))}
              </StyledSelect>
            </ReservationSilderFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{ xxl: 4, xl: 4, xs: 7 }}>
            <p className="formItem-title">Статус бронирования</p>
            <ReservationSilderFormItem
              name="reservationType"
              rules={[{ required: true, message: 'Пожалуйста статус бронирования.' }]}>
              <StyledSelect
                filterOption={false}
                size="large"
                // notFoundContent={null}
                placeholder="Выберите статус бронирования"
                dropdownAlign={{
                  points: ['bl', 'tl'],
                  offset: [0, -4],
                  overflow: {
                    adjustX: 0,
                    adjustY: 1,
                  },
                }}>
                {resTypes.length &&
                  resTypes.map(({ node }) => (
                    <StyledSelect.Option key={node.id} value={node.id}>
                      {node.title ? node.title : 'Нет названия'}
                    </StyledSelect.Option>
                  ))}
              </StyledSelect>
            </ReservationSilderFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{ xxl: 2, xl: 3, xs: 3 }}>
            <p className="formItem-title">Дополнительно</p>
            <ReservationSilderCheckboxesFormItem name="additional" valuePropName="checked" initialValue={false}>
              <Checkbox>Брендирование</Checkbox>
            </ReservationSilderCheckboxesFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{ xxl: 2, xs: 1 }}>
            <ReservationSliderSubmitButton htmlType="submit" loading={confirmLoading} type="primary">
              Забронировать
            </ReservationSliderSubmitButton>
          </SliderCellColRaw>
        </SliderRow>
      </CRUDForm>
      <style>
        {`
        .projectSearchInput input {
          padding-left: 23px !important;
        }
        .projectSearchInput .ant-select-selection-placeholder {
          padding-left: 23px !important;
        }

        .projectSearchInput .ant-select-selection-item {
          padding-left: 23px !important;
        }
        `}
      </style>
    </SlidingBottomPanel>
  );
}
