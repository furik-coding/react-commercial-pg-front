import React, { useEffect, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';

import { agreementContext } from './Agreement';
import EditInfo from "./Blocks/EditIfo"
import Table from '../../../../components/Tablea/Tablea';

import { TitleLogo } from '../../../../components/Styles/ComponentsStyles';
import { HeaderWrapper, HeaderTitleWrapper, StyledButton } from '../../../../components/Styles/DesignList/styles';
import { ButtonGroup } from '../../../../components/Styles/ButtonStyles';
import { JobTitle } from '../../../../components/Styles/StyledBlocks';
import { useHistory } from 'react-router';

const CONTRACT_UPDATE = gql`
mutation(
  $id:ID!

  $initiator: ID
  $creator: ID
  $contractType: ID
  $partner: ID

  $signatoryOne: String
  $signatoryTwo: String
  $basedOnDocument: String
  $returnStatus: Boolean
  $comment: String
  $paymentDate: DateTime
) {
  updateContract(
    id:$id
    input: {
      initiator:$initiator
      creator:$creator
      partner:$partner
      contractType:$contractType

      signatoryOne:$signatoryOne
      signatoryTwo:$signatoryTwo
      basedOnDocument:$basedOnDocument
      returnStatus:$returnStatus
      comment:$comment
      paymentDate:$paymentDate
    }
  ) {
    contract {
      id
    }
  }
}
`;

const columns = [
  {
    title: 'Код договора',
    dataIndex: 'code',

    width: 130,
  },
  {
    title: 'Бренд',
    dataIndex: 'brand',

    width: 100,
  },
  {
    title: 'Сектор деятельности',
    dataIndex: 'sector',
    width: 100,
  },
  {
    title: 'Создано',
    dataIndex: 'create',
    width: 100,
  },
  {
    title: 'Создатель',
    dataIndex: 'creator',
    width: 100,
  },
  {
    title: 'Приложение',
    dataIndex: 'application',
    width: 100,
  },
];
var data = [
  {
    key: 1,
    code: '#2020050301323',
    brand: 'CocaCola',
    sector: 'Производство напитков',
    create: '29.05.2020',
    creator: 'Колобов Анемподист',
    application: '02394.pdf',
  },
  {
    key: 2,
    code: '#2020050301323',
    brand: 'CocaCola',
    sector: 'Производство напитков',
    create: '29.05.2020',
    creator: 'Колобов Анемподист',
    application: '02394.pdf',
  },
  {
    key: 3,
    code: '#2020050301323',
    brand: 'CocaCola',
    sector: 'Производство напитков',
    create: '29.05.2020',
    creator: 'Колобов Анемподист',
    application: '02394.pdf',
  },
  {
    key: 4,
    code: '#2020050301323',
    brand: 'CocaCola',
    sector: 'Производство напитков',
    create: '29.05.2020',
    creator: 'Колобов Анемподист',
    application: '02394.pdf',
  },
  {
    key: 5,
    code: '#2020050301323',
    brand: 'CocaCola',
    sector: 'Производство напитков',
    create: '29.05.2020',
    creator: 'Колобов Анемподист',
    application: '02394.pdf',
  },
];

const PanelDesign = (props) => {
  const [item, /*setItem*/] = useContext(agreementContext);
  const [updateContract] = useMutation(CONTRACT_UPDATE);
  let history = useHistory();
  const Update = (e) => {
    history.push('/base/documents/agreements');
    e.preventDefault();
    updateContract({
      variables: {
        id: item.id,
        initiator: item.initiatorId,
        creator: item.creatorId,
        partner: item.partnerId,
        contractType: item.contractTypeId,
        signatoryOne: item.signatoryOne,
        signatoryTwo: item.signatoryTwo,
        basedOnDocument: item.basedOnDocument,
        returnStatus: item.returnStatus,
        comment: item.comment
      }
    });
  };
  useEffect(() => {
    if (item.contractAttachments && item.contractAttachments.edges.length) {
      data = item.contractAttachments.edges.map(({ node }) => ({
        key: node.id,
        code: node.code,
        brand: node.project && node.project.brand && node.project.brand.title,
        sector: node.project && node.project.brand && node.project.brand.workingSector && node.project.brand.workingSector.title,
        create: node.createdDate,
        creator: node.creator && node.creator.name,
        application: node.project && node.project.title
      }));
    }
  }, [item, item.contractAttachments]);

  return (
    <div>
    <HeaderWrapper>
    <HeaderTitleWrapper>
      <TitleLogo />
      <JobTitle>Договор № { item.code }</JobTitle>
    </HeaderTitleWrapper>
    <ButtonGroup>
      <StyledButton
        backgroundColor="#008556"
        type="button"
        onClick={Update}
      >
        Сохранить
      </StyledButton>
    </ButtonGroup>
  </HeaderWrapper>
    <div style={{ display: 'flex',marginBottom:"20px"  }}>
      <div style={{ flex: '1 0 40%', margin: '0 1vw 1vw 0' }}>
        <EditInfo></EditInfo>
      </div>
      <div style={{ display: 'flex', overflowX: 'hidden', width: '100%' }}>
        <div className="outdoor-table-bar">
          <Table style={{ width: '100%' }} columns={columns} data={data}  title={`Связанные проекты`}/>
        </div>
        <style>
          {`.outdoor-table-bar {
            width: 100%;
          }
          `}
        </style>
      </div>
    </div>
    </div>
  );
};

export default PanelDesign;
