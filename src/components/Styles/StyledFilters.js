import styled from 'styled-components';
import { Select, Collapse } from 'antd';
const { Option } = Select;
const { Panel } = Collapse;
export const StyledSelect = styled(Select)`
  margin-bottom: 20px;
  font-size: 14px;
  color: #656565;
  font-weight: 600;
  width: 200px;
  border-radius: 4px;
`;
export const StyledPanel = styled(Panel)`
  font-size: 14px;
  text-align: left;
  color: #171717;
  font-weight: 600;
  background-color: #f5f7fa;
`;
export const FilterSection = styled.div`
  border-top: 1px solid #d3dff0;
  padding: 20px 15px;
`;

export const FilterSectionTitle = styled.div`
  padding: 0;
  margin-bottom: 18px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

export const FilterSectionTitleText = styled.div`
  font-size: 14px;
  text-align: left;
  color: #171717;
  font-weight: 600;
`;

export const Checks = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const FilterMenu = styled.div`
  font-family: 'SF UI Display Light', sans-serif;
  min-width: 240px;
  max-width: 240px;
  border-right: 1px solid #d3dff0;
  background-color: #f5f7fa;
`;


export const FilterMenu260 = styled.div`
  font-family: 'SF UI Display Light', sans-serif;
  min-width: 260px;
  max-width: 260px;
  border-right: 1px solid #d3dff0;
  background-color: #f5f7fa;
`;

export const FilterMenu280 = styled.div`
  font-family: 'SF UI Display Light', sans-serif;
  min-width: 280px;
  max-width: 280px;
  border-right: 1px solid #d3dff0;
  background-color: #f5f7fa;
`;

export const FilterText = styled.h6`
  font-family: 'SF UI Display Bold', sans-serif;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  color: #003360;
  margin: 0px 32px;
  padding: 16px 0;
`;

export const SearchTitle = styled.div`
  width: 100%;
  height: 60px;
  margin: 1vw 0 0 0;
`;

export const Form = styled.form`
  width: 100%;
  text-align: center;
`;
