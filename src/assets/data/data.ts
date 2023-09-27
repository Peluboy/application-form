export const inputFields: {
  name: string;
  label: string;
  type?: string;
  hasCheckbox?: boolean;
  hasSwitch?: boolean;
  switchLabel?: string;
}[] = [
  { name: "firstName", label: "First Name" },
  { name: "lastName", label: "Last Name" },
  { name: "emailId", label: "Email" },
  {
    name: "phoneNumber",
    label: "Phone",
    type: "tel",
    hasSwitch: true,
    switchLabel: "Hide",
    hasCheckbox: true,
  },
  {
    name: "nationality",
    label: "Nationality",
    hasCheckbox: true,
    hasSwitch: true,
  },
  {
    name: "currentResidence",
    label: "Current Residence",
    hasSwitch: true,
    hasCheckbox: true,
    switchLabel: "Hide",
  },
  {
    name: "idNumber",
    label: "ID Number",
    hasCheckbox: true,
    hasSwitch: true,
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    hasSwitch: true,
    hasCheckbox: true,
    switchLabel: "Hide",
  },
  { name: "gender", label: "Gender", hasCheckbox: true, hasSwitch: true },
];

export const profileFields: {
  name: string;
  label: string;
  type?: string;
  hasCheckbox?: boolean;
  hasSwitch?: boolean;
  switchLabel?: string;
}[] = [
  {
    name: "education",
    label: "Education",
    hasSwitch: true,
    switchLabel: "Hide",
    hasCheckbox: true,
  },
  {
    name: "experience",
    label: "Experience",
    switchLabel: "Hide",
    hasCheckbox: true,
    hasSwitch: true,
  },
  {
    name: "resume",
    label: "Resume",
    hasSwitch: true,
    hasCheckbox: true,
    switchLabel: "Hide",
  },
];
