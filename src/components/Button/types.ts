export type ButtonProps = {
  onClick?: () => void;
  text: string;
  styleName?: string;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
};
