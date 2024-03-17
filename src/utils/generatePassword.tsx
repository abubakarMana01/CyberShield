type Props = {
  useSymbols: boolean;
  useNumbers: boolean;
  useLowerCase: boolean;
  useUpperCase: boolean;
  passwordLength: number;
};

export default function useGeneratePassword({
  useSymbols,
  useNumbers,
  useLowerCase,
  useUpperCase,
  passwordLength,
}: Props) {
  let charset = '';
  let newPassword = '';
  if (useSymbols) {
    charset += '!@#$%^&*()';
  }
  if (useNumbers) {
    charset += '0123456789';
  }
  if (useLowerCase) {
    charset += 'abcdefghijklmnopqrstuvwxyz';
  }
  if (useUpperCase) {
    charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  for (let i = 0; i < +passwordLength; i++) {
    newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return newPassword;
}

export const generatePassword = ({
  useSymbols,
  useNumbers,
  useLowerCase,
  useUpperCase,
  passwordLength,
}: Props) => {
  let charset = '';
  let newPassword = '';
  if (useSymbols) {
    charset += '!@#$%^&*()';
  }
  if (useNumbers) {
    charset += '0123456789';
  }
  if (useLowerCase) {
    charset += 'abcdefghijklmnopqrstuvwxyz';
  }
  if (useUpperCase) {
    charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  for (let i = 0; i < +passwordLength; i++) {
    newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return newPassword;
};
