import React from 'react'
import styled from "styled-components";
import {FlexBox} from "../../styles";
import {config} from "../../config";

const ListItem = ({title, subtitle, onClick}) => {
    return (
        <ListContainer onClick={onClick} direction={'column'} align={'start'}>
            <Title>
                {title}
            </Title>
            <SubTitle>
                {subtitle}
            </SubTitle>
        </ListContainer>
    )
}

export default ListItem

const ListContainer = styled(FlexBox)`
  padding-bottom: 10px;
  width: 90%;

  &:before {
      
  }
  
`
const Title = styled(FlexBox)`
  font-size: 14px;
  color: ${config.colors.black};
`

const SubTitle = styled(FlexBox)`
  font-size: 10px;
  opacity: 0.5;
`
