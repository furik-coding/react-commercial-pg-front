import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import Table from '../../Tablea/Tablea';
import {  agreementsContext } from './AgreementsTab';
import { column } from '../../Table/utils';
import { routes } from '../../../routes';

import icon_pen_blue from '../../../img/outdoor_furniture/table_icons/blue_pen.svg';

const AgreementsPanel = () => {
    const [filter, /*setFilter*/] = useContext(agreementsContext);
    const columns = [
      column('Код договора', 'code', 130),
      column('Контрагент', 'partner', 100),
      column('Проект', 'project', 100),
      column('Дата  заключения', 'date_start', 100),
      column('Дата окончания', 'date_end', 100),
      {
        width: 40,
        title: '',
        render: (text, record) => (
          <Link to={{ pathname: routes.bases.agreement.url(record.key) }}>
            <img style={{ cursor: 'pointer' }} src={icon_pen_blue} alt="" />
          </Link>
        ),
      },
    ];
    const AGREEMENT_T = gql`

  query SearchContract(
    $initiator: String
    $creator: String
    $partner_Title: String
    $contractType: String
    $start: DateTime
    $registrationDate: DateTime
    $end: DateTime
    $returnStatus: Boolean
    )
    {
    searchContract(
      initiator_Name:$initiator
      creator_Name:$creator
      partner_Title:$partner_Title
      contractType_Name:$contractType
      start:$start
      registrationDate:$registrationDate
      end:$end
      returnStatus:$returnStatus
    ) {
      edges {
        node {
          id
          code
          partner {
            id
            title
          }
          start
          end
          creator{
            name
          }
          initiator{
            name
          }
          # contractType
          paymentDate
          signatoryOne
          signatoryTwo
          basedOnDocument
          returnStatus
          contractPdf
          # additionallyAgreement
          comment
          createdAt
          updatedAt
        }
      }
    }
  }
    `;
  var data1 = [];

  const { loading, error, data } = useQuery(AGREEMENT_T, { variables: filter });
  if (error)
    return <h3>Error :(</h3>;
  // if (loading) return <h3></h3>;

  if (data) {
    console.log(data);
    data1 = data.searchContract.edges.map((item,index) => ({
      key: item.node.id,
      code: item.node.code,
      partner:  item.node.partner ? item.node.partner.name:"",
      project: 'CocaCola',
      date_start:item.node.start && new Date(item.node.start).toLocaleDateString('en-GB'),
      date_end:item.node.end && new Date(item.node.end).toLocaleDateString('en-GB'),
    }));

  }

  return (

          <Table columns={columns} data={data1} notheader={true} loading={loading}/>
  );
};

export default  AgreementsPanel;
