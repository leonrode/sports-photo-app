import {sports} from "../lib/utils"

const SportFilter = ({_onChange, events, className}) => {



    return <select onChange={(e) => _onChange(e.target.value)} className={className}>
        <option>All Sports</option>
        {sports.map(sport => events.includes(sport) ? <option key={sport}>{sport}</option> : null )}
  </select>

}

export default SportFilter;