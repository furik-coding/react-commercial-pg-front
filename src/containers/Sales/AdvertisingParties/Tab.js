import React from 'react';
import { Button, Space, Input, Popover } from 'antd';

// ICONS
import designIcon from '../../../img/sales/projectDropdown/design.svg';
import lighting from '../../../img/sales/projectDropdown/lighting.svg';
import paket from '../../../img/sales/projectDropdown/paket.svg';
import managerB from '../../../img/sales/managerB.svg';
import managerS from '../../../img/sales/managerS.svg';


const Tab = (props) => {
  let content = (
      <Space
        style={{
          width: '435px',
          flexDirection: 'column',
          boxShadow: '0px 4px 7px rgba(0, 0, 0, 0.119646)',
          borderRadius: '8px',
        }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '20px 20px 15px 20px',
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
          <span
            style={{
              color: '#1A1A1A',
              fontWeight: 'bold',
              fontSize: '18px',
            }}>
            Проект СocaCola
          </span>
            <p>
              {props.cond === 'sold' ? (
                <span className="sold">Продано</span>
              ) : props.cond === 'confirmed' ? (
                <span className="confirmed">Утверждено</span>
              ) : (
                ''
              )}

              <span>до 24.07.2020</span>
            </p>
          </div>
          <Button
            type="primary"
            style={{ borderRadius: '5px', marginLeft: '5px' }}
            onClick={() => {
              props.history.push('/sales/project_card');
            }}>
            Открыть Проект
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid #D3DFF0',
            borderBottom: '1px solid #D3DFF0',
          }}>
          <div
            style={{
              borderRight: '1px solid #D3DFF0',
            }}
            className="sectionItem">
            <img src={paket} alt="paket icon" />
            <span>Пакет:</span>
            <span
              style={{
                fontWeight: 'bold',
              }}>
            A2
          </span>
          </div>
          <div
            className="sectionItem"
            style={{
              borderRight: '1px solid #D3DFF0',
            }}>
            <img src={designIcon} alt="design icon" />
            <span>Дизайн:</span>
            <span
              style={{
                fontWeight: 'bold',
              }}>
            Да
          </span>
          </div>
          <div className="sectionItem">
            <img src={lighting} alt="lighting icon" />
            <span>Освещение:</span>
            <span
              style={{
                fontWeight: 'bold',
              }}>
            Да
          </span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderBottom: '1px solid #D3DFF0',
            marginBottom: '15px',
          }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 15px 0',
            }}>
            <div
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
              }}>
              <img src={managerS} alt="icon" />
              <span
                style={{
                  fontSize: 12,
                }}>
              Менеджер по продажам:
            </span>
            </div>
            <span
              style={{
                fontWeight: 'bold',
                fontSize: 14,
              }}>
            Иванов Иван Иванович
          </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 15px',
            }}>
            <div
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
              }}>
              <img src={managerB} alt="icon" />
              <span
                style={{
                  fontSize: 12,
                }}>
              Менеджер бэк-офиса:
            </span>
            </div>
            <span
              style={{
                fontWeight: 'bold',
                fontSize: 14,
              }}>
            Иванов Иван Иванович
          </span>
          </div>
        </div>
        <div
          style={{
            padding: '0 15px',
            marginBottom: '15px',
          }}>
          <Input size="large" placeholder="Комментарий" />
        </div>

        <style>
          {`
        .ant-space-item {
          width: 100%;
          margin-right: 0 !important;
        }
        .ant-popover-inner-content {
            padding: 0;
        }

        .sold {
          margin-right: 10px;
          font-size: 12px;
          font-weight: bold;
          color: #D42D11;
          position: relative;
          margin-left: 10px
        }

        .sold:before {
          content: "";
          height: 8px;
          width: 8px;
          border-radius: 50%;
          background-color: #D42D11;
          position: absolute;
          bottom: 3px;
          left: -12px;
        }

        .confirmed {
          margin-right: 10px;
          font-size: 12px;
          font-weight: bold;
          color: #8E730F;
          position: relative;
          margin-left: 10px
        }

        .confirmed:before {
          content: "";
          height: 8px;
          width: 8px;
          border-radius: 50%;
          background-color: #FDC911;
          position: absolute;
          bottom: 3px;
          left: -12px;
        }

        .sectionItem {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 12px 20px;
          gap: 5px;
          width: 100%;
        }

        .sectionItem>img {
          margin-right: 4px;
        }
        `}
        </style>
      </Space>
  );

  return content;
};
export default Tab;
