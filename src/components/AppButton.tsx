import { Button } from 'react-native-paper';

export function AppButton(props: any) {
  return (
    <Button
      mode="contained"
      buttonColor="#5DBB63"
      textColor="#0F1A14"
      style={{
        borderRadius: 14,
        marginTop: 10,
      }}
      contentStyle={{
        paddingVertical: 6,
      }}
      {...props}
    />
  );
}