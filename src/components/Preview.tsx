const Preview: React.FC<any> = ({ data }) => (
  <pre>{JSON.stringify(data, null, 4)}</pre>
);

export default Preview;
