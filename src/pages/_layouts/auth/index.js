import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Content } from './styles';

/*
O children são todos componentes filhos do
AuthLayout, todos que estão dentro dele são
passados para dentro do Wrapper
*/
export default function AuthLayout({ children }) {
    return (
        <Wrapper>
            <Content>
                {children}
            </Content>
        </Wrapper>
    );
}

AuthLayout.propTypes = {
    children: PropTypes.element.isRequired,
};