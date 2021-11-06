import React from 'react';
import styled from "styled-components";

const FooterWrapper = styled('div')`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 35px;
  background-color: #322C2C;
`;

const TextWrapper = styled('a')`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 7px;
  color: white;
	text-decoration: none;
`;

const Footer = () => {
	return (
			<FooterWrapper>
				<TextWrapper href='https://github.com/ArtemMalafeev'>
					Created By Artem Malafeev
				</TextWrapper>
			</FooterWrapper>
	)
}

export default Footer