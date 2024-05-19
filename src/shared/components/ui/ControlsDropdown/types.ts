interface ControlsDropdownOption {
  label: string;
  value: string;
}

export interface ControlsDropdownProps {
  onChange: (val: string) => void,
  options: ControlsDropdownOption[],
  value: string | null,
  icon?: string,
  placeholder?: string,
  preTitle?: string,
  disabled?: boolean,
}
