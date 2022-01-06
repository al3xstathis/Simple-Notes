import styled from "styled-components"
import {Button} from "@mantine/core";
import {config} from "../config";

export const FlexBox = styled.div`
	display: flex;
	flex-direction: ${props => props.direction || props.dir || "row"};
	justify-content: ${props => props.justify || "flex-start"};
	align-items: ${props => props.align || "center"};
	flex-wrap: ${props => props.wrap || "nowrap"};
    ${props => props.fluid ? {width: '100%', flex: 1} : {}}
`

export const StyledButton = styled(Button)`
  color: ${props => props.color ? props.color : config.colors.black};
  border-color: ${props => props.border ? props.border : config.colors.black};
`
