import React, { useContext, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

import { constructContext } from '../../../../../containers/Base/Construction/Construction';

import { BlockBody, BlockTitle, BlockTitleText, InputTitle, Medium, Row } from '../../../../Styles/StyledBlocks';
import { StyledInput, StyledSelect } from '../../../../Styles/DesignList/styles';

import anchorIcon from '../../../../../img/input/anchor.svg';

const GET_OBSTRUCTIONS = gql`
query {
  searchObstruction {
    edges {
      node {
        id
        title
      }
    }
  }
}
`

export default function TechParams() {
  const [item, setItem] = useContext(constructContext);
  const [obstrTitle, setObstrTitle ] = useState(null);
  const obstructions = useQuery(GET_OBSTRUCTIONS).data;
  
  console.log('[obstructions]', obstructions);
  return (
    <Medium>
      <BlockTitle>Технические параметры</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '48%' }}>
            <InputTitle>Техническая проблема</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.techProblem ? item.techProblem : ''}
              onChange={(e) => setItem({ ...item, techProblem: e.target.value })}></StyledInput>
          </div>
          <div style={{ width: '48%' }}>
            <InputTitle>Комментарий</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.techComment ? item.techComment : ''}
              onChange={(e) => setItem({ ...item, techComment: e.target.value })}></StyledInput>
          </div>
        </Row>
        <Row>
          <div style={{ width: '48%' }}>
            <InputTitle>Статус по подключению</InputTitle>
            <StyledSelect
              prefix={<img src={anchorIcon} />}
              defaultValue={item.statusConnection ? item.statusConnection : ''}
              onChange={(value) => setItem({ ...item, statusConnection: value })}>

                <StyledSelect.Option value={true} >{'Подключён'}</StyledSelect.Option>
                <StyledSelect.Option value={false}>{'Не Подключён'}</StyledSelect.Option>

              </StyledSelect>
          </div>
          <div style={{ width: '48%' }}>
            <InputTitle>Помеха</InputTitle>
            {
              obstructions && obstructions.searchObstruction.edges.length > 0 ? 
                <StyledSelect
                prefix={<img src={anchorIcon} />}
                defaultValue={item.obstruction ? item.obstruction.id : ''}
                onChange={(value) => setItem({ ...item, obstruction: value })}>

                  {
                    obstructions.searchObstruction.edges && obstructions.searchObstruction.edges.map(item => {
                      return(
                        <StyledSelect.Option value={item.node.id} >{item.node.title}</StyledSelect.Option>
                      )
                    })
                  }

                </StyledSelect> :
                <StyledInput
                prefix={<img src={anchorIcon} />}
                defaultValue={item.obstruction ? item.obstruction : ''}
                onChange={(e) => setItem({...item, obstruction: e.target.value})}></StyledInput>
            }
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
}
