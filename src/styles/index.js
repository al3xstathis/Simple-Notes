import styled from "styled-components"
import {Button} from "@mantine/core";
import {config} from "../config";
import {motion} from 'framer-motion';

export const FlexBox = styled(motion.div)`
	display: flex;
	flex-direction: ${props => props.direction || props.dir || "row"};
	justify-content: ${props => props.justify || "flex-start"};
	align-items: ${props => props.align || "center"};
	flex-wrap: ${props => props.wrap || "nowrap"};
    ${props => props.fluid ? {width: '100%', flex: 1} : {}}
`

export const StyledButton = styled(Button)`
  color: ${props => props.color ? props.color : config.colors.black.black90};
  background: ${props => props.background ? props.background : 'transparent'};
  &:hover, &:focus {
    background-color: transparent;
  }
  width: ${props => props.width};
`
