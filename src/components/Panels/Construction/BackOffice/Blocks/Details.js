import React, { useContext } from 'react';
import { constructContext } from '../../../../../containers/Base/Construction/Construction';

import { Radio, notification } from 'antd';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';

import { BlockBody, Row, Medium, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { StyledButton, StyledSelect, StyledInput } from '../../../../Styles/DesignList/styles';
import anchorIcon from '../../../../../img/input/anchor.svg';

const openNotification = (placement) => {
  notification.info({
    message: 'Уведомление',
    description: 'Нобходимо привязать местоположение к конструкции!',
    placement,
  });
};
const FAMILY_T = gql`
  query {
    searchFamilyConstruction {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
const GET_UNDERFAMILIES = gql`
  query SearchUnderFamily($id: ID, $title: String) {
    searchUnderFamilyConstruction(family_Id: $id, title_Icontains: $title) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
const GET_MODELS = gql`
  query SearchModelConstruction($id: ID, $title: String) {
    searchModelConstruction(underfamily_Id: $id, title_Icontains: $title) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
export default function Details() {
  const [item, setItem] = useContext(constructContext);
  const families = useQuery(FAMILY_T).data;
  const getModels = useQuery(GET_MODELS).data;
  const underFamily = useQuery(GET_UNDERFAMILIES).data;
  return (
    <Medium>
      <BlockTitle>Детали конструкции</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '48%' }}>
            <InputTitle>Семейство конструкции</InputTitle>
            <StyledSelect
              defaultValue={
                item.format && item.format.model && item.format.model.underFamily ? (
                  item.format.model.underfamily.family.title
                ) : (
                  <img src={anchorIcon} alt={'Подсемейство'} />
                )
              }
              onChange={(value) => setItem({ ...item, familyConstruction: { ...item.familyConstruction, id: value } })}>
              {families &&
                families.searchFamilyConstruction &&
                [...families.searchFamilyConstruction.edges, { node: { id: 'Empty', title: '' } }].map((item) => (
                  <StyledSelect.Option key={item.node.id} value={item.node.title}>
                    <img src={anchorIcon} />
                    <span>{item.node.title}</span>
                  </StyledSelect.Option>
                ))}
            </StyledSelect>
          </div>
          <div style={{ width: '48%' }}>
            <InputTitle>Доступность конструкции</InputTitle>
            <StyledSelect
              defaultValue={item.availabilityConstruction ? item.availabilityConstruction.id : <img src={anchorIcon} />}
              onChange={(value) => setItem({ ...item, availabilityConstruction: value })}>
              <StyledSelect.Option value={true}>
                <img src={anchorIcon} alt={'Доступна'} />
                <span> Доступна</span>
              </StyledSelect.Option>
              <StyledSelect.Option value={false}>
                <img src={anchorIcon} alt={'Недоступна'} />
                <span>Недоступна</span>
              </StyledSelect.Option>
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '48%' }}>
            <InputTitle>Подсемейство конструкции</InputTitle>
            <StyledSelect
              defaultValue={
                item.format && item.format.model && item.format.model.underFamily ? (
                  item.format.model.underfamily.title
                ) : (
                  <img src={anchorIcon} alt={'Подсемейство'} />
                )
              }
              onChange={(value) =>
                setItem({ ...item, underFamilyConstruction: { ...item.underFamilyConstruction, id: value } })
              }>
              {underFamily &&
                underFamily.searchUnderFamilyConstruction &&
                [...underFamily.searchUnderFamilyConstruction.edges, { node: { id: 'Empty', title: '' } }].map(
                  (item) => (
                    <StyledSelect.Option key={item.node.id} value={item.node.title}>
                      <img src={anchorIcon} />
                      <span>{item.node.title}</span>
                    </StyledSelect.Option>
                  ),
                )}
            </StyledSelect>
          </div>

          <div style={{ width: '48%' }}>
            <InputTitle>Модель</InputTitle>
            <StyledSelect
              prefix={<img src={anchorIcon} alt={'Мод§ель'} />}
              defaultValue={item.format && item.format.model ? item.format.model.title : ''}
              onChange={(value) => setItem({ ...item, modelConstruction: { ...item.modelConstruction, id: value } })}>
              {getModels &&
                getModels.searchModelConstruction &&
                [...getModels.searchModelConstruction.edges, { node: { id: 'Empty', title: '' } }].map((item) => (
                  <StyledSelect.Option key={item.node.id} value={item.node.title}>
                    <img src={anchorIcon} />
                    <span>{item.node.title}</span>
                  </StyledSelect.Option>
                ))}
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div>
            <InputTitle onClick={() => openNotification('bottomRight')}>Наличие земли (!)</InputTitle>
            <StyledRadio
              defaultValue={
                item && item.location && item.location.hasArea ? item && item.location && item.location.hasArea : false
              }
              onChange={(e) => setItem({ ...item, hasArea: e.target.value })}>
              <Radio value={true}>Есть</Radio>
              <Radio value={false}>Нет</Radio>
            </StyledRadio>
          </div>
          <StyledButton backgroundColor="#2C5DE5">Открыть местоположение</StyledButton>
        </Row>
      </BlockBody>
    </Medium>
  );
}

const StyledRadio = styled(Radio.Group)`
  height: 40px !important;
  display: flex;
  align-items: center;

  span {
    color: #1a1a1a !important;
  }
`;
