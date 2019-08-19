const getFlexDirection = ({ column, row }) => {
  if (column && row) throw new Error('Youve specified both flex column and flex row');

  if (column) return 'column';
  if (row) return 'row';

  return undefined;
};

const flexStyle = ({
  flex,
  displayFlex = true,
  column,
  row,
  spaceBetween,
}) => ({
  display: displayFlex ? 'flex' : undefined,
  flex,
  flexDirection: getFlexDirection({ column, row }),
  justifyContent: spaceBetween ? 'space-between' : undefined,
});

export default flexStyle;
