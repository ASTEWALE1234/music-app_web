import styled from '@emotion/styled';
import { variant } from 'styled-system';

const buttonVariants = variant({
  key: 'buttonVariants',
});

const Button = styled.button<any>(buttonVariants);

Button.defaultProps = {
  variant: 'primary',
};

export default Button;