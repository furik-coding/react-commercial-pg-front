import React, {useState, useMemo, useEffect} from 'react';
import styled from 'styled-components';
import { Checkbox, DatePicker, Form, Input } from 'antd';
import date from '../../../img/left-bar/filter/date.svg';
import { SubmitButton } from '../../../components/Styles/ButtonStyles';
import { SlidingBottomPanel } from '../../../components/SlidingBottomPanel/SlidingBottomPanel';
import { CRUDForm } from '../../../components/SlidingBottomPanel/CRUDForm';
import { SliderCellColRaw, SliderRow } from '../../../components/SlidingBottomPanel/PanelComponents';
import { StyledSelect } from '../../../components/Styles/DesignList/styles';
import useDebounce from '../../Administration/components/useDebounce';
import { gql, useLazyQuery } from '@apollo/client';
import anchorIcon from '../../../img/input/anchor.svg';
import { useHistory } from 'react-router';

const InputIconSpanSyled = styled.span`
    position: absolute;
    transform: translate(55% ,30%);
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

const checkBoxOptions = [
  { label: 'Выставление АВР', value: 'Выставление АВР' }
];

// Ок
const DateStateText = styled.p`
    color: #2C5DE5;
    fontSize: 14px;
    fontWeight: bold;
    margin: 0;
`;

const ReservationSilderFormItem = styled(Form.Item)`
    display: flex;
    flexDirection: column;
    maxWidth: 300px;
    width: 100%;
`;

const ReservationSilderCheckboxesFormItem = styled(Form.Item)`
    display: flex;
    flex-direction: column;
    max-width: 220px;
    width: 100%;
    min-width: 220px;
    font-size: 14px;
    font-weight: 400;
`;

const ReservationSliderSubmitButton = styled(SubmitButton)`
    margin-left: 2rem;
    fontWeight: bold;
    min-width: 10rem;
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

export function ReservationSlider({sliderState, dataCount}) {
  const [partnerValue, setPartnerValue] = useState(undefined);
  const [partnerData, setPartnerData] = useState([]);
  const [partnerSearchText, setPartnerSearchText] = useState('');
  const [partnerLoading, setPartnerLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(partnerSearchText, 500);
  const [getPartner, { loading, data }] = useLazyQuery(SEARCH_PARTNER);
  let history = useHistory();

  const handleSearchPartner = (value) => {
    setPartnerSearchText(value);
  };
  const handleChangePartner = (value) => {
    setPartnerValue(value);
  };

  useEffect(() => {
    getPartner({
      variables: {
        title_Icontains: debouncedSearchTerm
      }
    });
    setPartnerLoading(loading);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if(data && data.searchPartner.edges) {
      setPartnerData(data.searchPartner.edges);
      setPartnerLoading(loading);
    }
  }, [data]);


  return (
    <SlidingBottomPanel title={`Выстваление счета`}
                        classNameSuffix={'app'}
                        onClose={sliderState.closeAdd}
                        sliderClass="advertising-part-slider"
    >
      <CRUDForm >
        <SliderRow>
          <SliderCellColRaw {...{xxl: 6, xl: 6, xs: 5}}>
            <ReservationSilderFormItem >
              <p className="formItem-title">Дата оплаты по счету</p>
              <InputIcon img={date} alt="date icon" />
              <DatePicker
                dropdownClassName="topCenter"
                className="date-picker"
                suffixIcon={<DateStateText>Ок</DateStateText>}
                size={'large'}
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
              />
            </ReservationSilderFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{xxl: 6, xl: 6, xs: 5}}>
          <ReservationSilderFormItem title="На кого выставляется счет" >
            <p className="formItem-title">Способ оплаты клиентом</p>
              {/* <p className="formItem-title">Проект</p>
              <InputIcon img={inputIcon} alt="input icon" />
              <Input size="large" placeholder="Название проекта" className="projectName-input" onChange={(e) => {
                console.log(e.target.value)
                console.log(projectName)
                setProjectName(e.target.value)
                }} /> */}
                <StyledSelect
                  placeholder={<><img src={anchorIcon} alt={"Банковский перевод"}/> <span>Банковский перевод</span> </>}
                  size={'large'}
                >
                  <StyledSelect.Option value={"Наличные"}><span>Наличные</span></StyledSelect.Option>
                  <StyledSelect.Option value={"Бартер"}><span>Бартер</span></StyledSelect.Option>
                  <StyledSelect.Option value={"Банковский перевод"}><span>Банковский перевод</span></StyledSelect.Option>
              </StyledSelect>
            </ReservationSilderFormItem>


          </SliderCellColRaw>
          <SliderCellColRaw {...{xxl: 6, xl: 6, xs: 7}}>
          <ReservationSilderFormItem >
              <p className="formItem-title">На кого выставляется счет</p>
              {/* <InputIcon img={date} alt="date icon" />
              <ReservInputText placeholder="ТОО Рекламное агенство" /> */}
              <StyledSelect
                            showSearch
                            value={partnerValue}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            onSearch={handleSearchPartner}
                            onChange={handleChangePartner}
                            notFoundContent={null}
                            loading={partnerLoading}
                          >
                            {
                              partnerData && partnerData.map(({ node }) => (
                                <StyledSelect.Option key={node.id} value={node.id}>
                                  { node.title ? node.title : 'Нет названия' }
                                </StyledSelect.Option>
                              ))
                            }
                          </StyledSelect>
            </ReservationSilderFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{xxl: 9, xl: 9, xs: 7}}>
            <div className="slider-info-col">
              {
                dataCount.info.map(item => {

                  return(
                    <div className="slider-info-inner" >
                      <h5>{ item.title }:</h5>
                      <span>{ item.data }</span>
                    </div>
                  )
                })
              }
            </div>
          </SliderCellColRaw>
          <SliderCellColRaw {...{xxl: 9, xl: 9, xs: 7}}>
            <div className="slider-count-col">
            {
                dataCount.count.map(item => {

                  return(
                    <div className="slider-count-inner" >
                      <h5>{ item.title }:</h5>
                      <span>{ item.data } тг.</span>
                    </div>
                  )
                })
              }
            </div>
          </SliderCellColRaw>

          <SliderCellColRaw {...{xxl: 2, xs: 1}}>
            {/* <BtnGroup> */}
            <div className="slider-summary" >
              <h5>
              Итого:
              </h5>
              <span>
                  1 124 888 тг.
              </span>
              <ReservationSilderCheckboxesFormItem>
                <Checkbox.Group options={checkBoxOptions} defaultValue={['Выставление АВР']} />
              </ReservationSilderCheckboxesFormItem>
            </div>
            <ReservationSliderSubmitButton type="primary" htmlType="submit" onClick={
              () => {history.push('/sales/invoice')}
            }>
              Выставить счет
            </ReservationSliderSubmitButton>
          </SliderCellColRaw>
        </SliderRow>
      </CRUDForm>
    </SlidingBottomPanel>
  )
}



