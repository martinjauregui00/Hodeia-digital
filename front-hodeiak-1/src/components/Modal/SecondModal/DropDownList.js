import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

export const DropDownList = ({ status, list, setValue, string }) => {

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">{string}</InputLabel>
      <Select
        onChange={e => setValue(e.target.value)}
        required
        className="dropdownlist"
        defaultOpen={true}
        label={string}
      >
        {list.map(collection => string === "projects" ? <MenuItem key={collection.projectname} value={collection.projectname}>{collection.projectname}</MenuItem> : string === "epics" ? <MenuItem key={collection.epicname} value={collection.epicname}>{collection.epicname}</MenuItem> : string === "features" ? <MenuItem key={collection.featurename} value={collection.featurename}>{collection.featurename}</MenuItem> : string === "pbis" ? <MenuItem key={collection.pbiname} value={collection.pbiname}>{collection.pbiname}</MenuItem> :
          <></>)}

      </Select>
    </FormControl>
  )
}
