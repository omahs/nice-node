import {
  baseButton,
  primaryButton,
  secondaryButton,
  smallButton,
  iconLeft,
} from './button.css';

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What state is the button in?
   */
  disabled?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Text only, with icon, or just icon?
   */
  variant?: 'text' | 'icon-left' | 'icon-right' | 'icon';
  /**
   * Optional icon
   */
  icon?: React.ReactNode;
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction.
 */
export const Button = ({
  primary = false,
  size = 'medium',
  disabled = false,
  variant = 'text',
  icon,
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const buttonStyle = primary ? primaryButton : secondaryButton;
  const classNames = [baseButton, buttonStyle];
  if (size === 'small') {
    classNames.push(smallButton);
  }
  return (
    <button
      type="button"
      className={classNames.join(' ')}
      disabled={disabled}
      style={{ backgroundColor }}
      {...props}
    >
      <span className={variant === 'icon-left' ? iconLeft : ''}>{label}</span>
      {icon}
    </button>
  );
};