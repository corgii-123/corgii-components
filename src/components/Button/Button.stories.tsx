import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Button, { ButtonSize, ButtonType, ButtonProps } from './Button'

export default {
  title: 'Example/myButton',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => (
    <Button {...args} >
      {args.children}
    </Button>
);

export const Default = Template.bind({});
Default.args = {
  btnType: ButtonType.Default,
  children: 'Button',
};

export const Size = () => {
  return (
    <>
      <Button size={ButtonSize.Small}>
        Button
      </Button>
      <Button size={ButtonSize.Large}>
        Button
      </Button>
    </>
  )
}

export const Type = () => {
  return (
    <>
      <Button btnType={ButtonType.Danger}>
        Button
      </Button>
      <Button btnType={ButtonType.Primary}>
        Button
      </Button>
      <Button btnType={ButtonType.Link} href="https://www.bilibili.com">
        Button
      </Button>
    </>
  )
}
