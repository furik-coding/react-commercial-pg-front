import React, { useContext, useState, useEffect, useMemo } from 'react';
import { constructContext } from '../../../../../containers/Base/Construction/Construction';
import { useQuery, gql, useMutation } from '@apollo/client';

import { BlockBody, BlockTitle, BlockTitleText, Large } from '../../../../Styles/StyledBlocks';
import { BtnSuccess } from '../../../../Styles/ButtonStyles';
import ExtraRow from './Extras/ExtraRow';
const SiDE_CREATE = gql`
  mutation CreateConstructionSide($id: ID) {
    createConstructionSide(input: { construction: $id }) {
      constructionSide {
        id
      }
    }
  }
`;

export default function Sides(props) {
  const [apiData, setApiData] = useContext(constructContext);
  const [list, setList] = useState(apiData.ownedSides && apiData.ownedSides.edges);

  const [createConstruction, { data }] = useMutation(SiDE_CREATE);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const create = (e) => {
    e.preventDefault();
    createConstruction({ variables: apiData });
  };
  useMemo(() => {
    if (apiData.ownedSides && !deleteFlag && !list) {
      setList(apiData.ownedSides && apiData.ownedSides.edges);
    }
  }, [apiData, deleteFlag]);
  console.log();
  useEffect(() => {
    if (data) {
      setList([...list, { node: data.createConstructionSide.constructionSide }]);
    }
  }, [data]);
  const deleteHandler = (e, id) => {
    let filterList = list.filter((side) => side.node.id !== id);
    setList(filterList);
    setDeleteFlag(true);
  };
  return (
    <Large>
      <BlockTitle>
        <BlockTitleText>Стороны конструкции</BlockTitleText>
        <BtnSuccess onClick={create}>Добавить сторону</BtnSuccess>
      </BlockTitle>
      <BlockBody>
        {apiData.ownedSides &&
          list &&
          list.map((side, index) => {
            return (
              <div key={index}>
                <ExtraRow index={index} list={list} deleteHandler={(e) => deleteHandler(e, side.node.id)} />
              </div>
            );
          })}
      </BlockBody>
    </Large>
  );
}
