import styled, { css } from 'styled-components';
import { animated } from 'react-spring';
import { colors } from '../../../styles/colors';
import { ToastTypesEnum } from '../../../enums/toastTypes.enum';

const toastTypeVariations = {
  info: css`
    background: ${colors.white};
    color: ${colors.black};
  `,
  success: css`
    background: ${colors.green};
    color: ${colors.white};
  `,
  error: css`
    background: ${colors.red};
    color: ${colors.white};
  `,
};

interface IToastProps {
  type?: ToastTypesEnum;
  hasdescription: number;
}

export const Container = styled(animated.div)<IToastProps>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;
  z-index: 1051;

  ${(props) => toastTypeVariations[props.type || ToastTypesEnum.info]}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      opacity: 0.8;
      /* line-height: 20px; */
    }
  }

  button {
    position: absolute;
    right: 8px;
    top: 15px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: ${colors.white};
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  & + div {
    margin-top: 16px;
  }

  ${(props) =>
    !props.hasdescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
