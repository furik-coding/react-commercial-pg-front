import React, { useContext, useEffect } from 'react';
import { partnerContext } from '../../../../../../containers/Base/Partner/Partner';
import { gql, useMutation } from '@apollo/client';

import { StyledInput } from '../../../../../Styles/DesignList/styles';
import { RedDeleteBtn } from '../../../../../Styles/ButtonStyles';
import { InputTitle } from '../../../../../Styles/StyledBlocks';
import { Row } from '../../../../../Styles/StyledBlocks';
import red_can from '../../../../../../img/outdoor_furniture/red_can.svg';
import styled from 'styled-components';
import anchorIcon from '../../../../../../img/input/anchor.svg';
import { Form } from 'antd';

const InputWrapper = styled.div`
  width: 30%;
`;
const CONTACT_DELETE = gql`
  mutation Delete($id: ID!) {
    deleteContactPerson(id: $id) {
      deletedId
    }
  }
`;
export default function ExtraRow(props) {
  const [item, setItem] = useContext(partnerContext);
  const contact = props.index >= 0 ? item.contactPersons.edges[props.index].node : {};
  const [deleteContactPerson] = useMutation(CONTACT_DELETE);
  const deleteContact = () => {
    deleteContactPerson({ variables: { id: contact.id } }).then(() => {
      const contacts = item.contactPersons.edges.filter((person) => contact.id !== person.node.id);
      setItem({
        ...item,
        contactPersons: {
          edges: [...contacts],
        },
      });
    });
  };
  const [form] = Form.useForm();

  useEffect(() => {
    if (!props.delete) {
      props.formSetter(form);
    }
  }, []);

  return props.delete ? (
    <Row>
      <InputWrapper>
        <InputTitle>ФИО</InputTitle>

        <StyledInput prefix={<img src={anchorIcon} />} defaultValue={contact.name ? contact.name : ''} />
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Телефон</InputTitle>
        <StyledInput prefix={<img src={anchorIcon} />} defaultValue={contact.phone ? contact.phone : ''} />
      </InputWrapper>
      <InputWrapper>
        <InputTitle>E-mail </InputTitle>

        <StyledInput prefix={<img src={anchorIcon} />} defaultValue={contact.email ? contact.email : ''} />
      </InputWrapper>
      <RedDeleteBtn onClick={deleteContact}>
        <img src={red_can} alt="red_can" />
      </RedDeleteBtn>
    </Row>
  ) : (
    <Form form={form}>
      <Row>
        <InputWrapper>
          <InputTitle>ФИО</InputTitle>
          <Form.Item name="name">
            <StyledInput prefix={<img src={anchorIcon} />} />
          </Form.Item>
        </InputWrapper>
        <InputWrapper>
          <InputTitle>Телефон</InputTitle>
          <Form.Item name="phone">
            <StyledInput prefix={<img src={anchorIcon} />} />
          </Form.Item>
        </InputWrapper>
        <InputWrapper>
          <InputTitle>E-mail </InputTitle>
          <Form.Item name="email">
            <StyledInput prefix={<img src={anchorIcon} />} />
          </Form.Item>
        </InputWrapper>
        <div style={{ width: 40 }} />
      </Row>
    </Form>
  );
}
