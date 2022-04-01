const SportDropdown = ({ _onChange, className }) => {
  return (
    <select onChange={(e) => _onChange(e.target.value)} className={className}>
      <option>Skiing</option>
      <option>Cheerleading</option>
      <option>Cross Country</option>
      <option>Field hockey</option>
      <option>Football</option>
      <option>Soccer</option>
      <option>Soccer</option>
      <option>Swimming</option>
      <option>Tennis</option>
      <option>Volleyball</option>
      <option>Basketball</option>
      <option>Bowling</option>
      <option>Gymnastics</option>
      <option>Ice Hockey</option>
      <option>Indoor Track</option>
      <option>Wrestling</option>
      <option>Baseball</option>
      <option>Flag football</option>
      <option>Crew</option>
      <option>Golf</option>
      <option>Lacrosse</option>
      <option>Softball</option>
      <option>Track and Field</option>
      <option>Ultimate Frisbee</option>
    </select>
  );
};

export default SportDropdown;
