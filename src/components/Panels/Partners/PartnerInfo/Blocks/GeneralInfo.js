import React, { useContext } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

import { partnerContext } from '../../../../../containers/Base/Partner/Partner';
import { StyledInput, StyledSelect, StyledDatePicker } from '../../../../Styles/DesignList/styles';

import { BlockBody, Medium, Row, Column, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import anchorIcon from '../../../../../img/input/anchor.svg';
import porfolioIcon from '../../../../../img/input/portfolio.svg';
const SECTOR_T = gql`
  {
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
const PARTNER_T = gql`
  {
    searchPartnerType {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
const CLIENT_T = gql`
  {
    searchClientType {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
export default function GeneralInfo() {
  const [item, setItem] = useContext(partnerContext);
  const sector = useQuery(SECTOR_T).data;
  const partner = useQuery(PARTNER_T).data;
  const client = useQuery(CLIENT_T).data;
  if (!sector || !client || !partner) {
    return <span></span>;
  }
  return (
    <Medium style={{ height: '100%' }}>
      <BlockTitle>Общая информация</BlockTitle>
      <BlockBody>
        <form action="">
          <Row>
            <Column style={{ width: '48%' }}>
              <Row style={{ padding: '0' }}>
                <div style={{ width: '100%' }}>
                  <InputTitle>Наименование контрагента</InputTitle>
                  <StyledInput
                    prefix={<img src={porfolioIcon} />}
                    defaultValue={item.title ? item.title : ''}
                    onChange={(e) => setItem({ ...item, title: e.target.value })}></StyledInput>
                </div>
              </Row>
              <Row style={{ paddingBottom: '0' }}>
                <div style={{ width: '100%' }}>
                  <InputTitle>Сектор деятельности</InputTitle>
                  <StyledSelect
                    defaultValue={item.workingSectors && item.workingSectors.edges.length ? item.workingSectors.edges[0].node.id : <img src={anchorIcon} />}
                    onChange={(value) =>
                      setItem({
                        ...item,
                        workingSectors: {
                          edges: [
                            {
                              node: {
                                id: value,
                              },
                            },
                          ],
                        },
                      })
                    }>
                    {sector &&
                      sector.searchWorkingSector.edges.map((item) => (
                        <StyledSelect.Option key={item.node.id} value={item.node.id}>
                          <img src={anchorIcon} />
                          <span>{item.node.title}</span>
                        </StyledSelect.Option>
                      ))}
                  </StyledSelect>
                </div>
              </Row>
            </Column>
            <Column style={{ width: '48%', marginBottom: 'auto' }}>
              <InputTitle>Комментарий</InputTitle>
              <StyledInput.TextArea
                rows={5}
                autoSize={{ minRows: 5, maxRows: 5 }}
                placeholder="..."
                value={item.comment ? item.comment : ''}
                onChange={(e) => {
                  setItem({ ...item, comment: e.target.value });
                }}
                size={'large'}
              />
            </Column>
          </Row>

          <Row>
            <Column style={{ width: '48%' }}>
              <div style={{ width: '100%' }}>
                <InputTitle>Тип контрагента</InputTitle>
                <StyledSelect
                  defaultValue={item.partnerType ? item.partnerType.id : <img src={anchorIcon} />}
                  onChange={(value) => setItem({ ...item, partnerType: { ...item.partnerType, id: value } })}>
                  {partner &&
                    partner.searchPartnerType.edges.map((item) => (
                      <StyledSelect.Option key={item.node.id} value={item.node.id}>
                        <img src={anchorIcon} />
                        <span>{item.node.title}</span>
                      </StyledSelect.Option>
                    ))}
                </StyledSelect>
              </div>
            </Column>
            <Column style={{ width: '48%' }}>
              <div style={{ width: '100%' }}>
                <InputTitle>Тип клиента</InputTitle>
                <StyledSelect
                  defaultValue={item.clientType ? item.clientType.id : <img src={anchorIcon} />}
                  onChange={(value) => setItem({ ...item, clientType: { ...item.clientType, id: value } })}>
                  {client &&
                    client.searchClientType.edges.map((item) => (
                      <StyledSelect.Option key={item.node.id} value={item.node.id}>
                        <img src={anchorIcon} />
                        <span>{item.node.title}</span>
                      </StyledSelect.Option>
                    ))}
                </StyledSelect>
              </div>
            </Column>
          </Row>
          <Row>
            <Column style={{ width: '48%', marginBottom: '21px' }}>
              <div style={{ width: '100%' }}>
                <InputTitle>БИН компании</InputTitle>
                <StyledInput
                  prefix={<img src={anchorIcon} />}
                  defaultValue={item.binNumber ? item.binNumber : ''}
                  onChange={(e) => setItem({ ...item, binNumber: e.target.value })}></StyledInput>
              </div>
            </Column>
          </Row>
        </form>
      </BlockBody>
    </Medium>
  );
}
