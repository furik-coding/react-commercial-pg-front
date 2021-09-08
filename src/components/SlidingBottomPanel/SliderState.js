import { useState } from 'react';


export class SliderState {
  constructor(initialValue = null) {
    const [addShowed, setAddShowed] = useState(false);
    const [editShowed, setEditShowed] = useState(false);
    const [editedData, setEditedData] = useState(initialValue === null ? {} : initialValue)
    const [caller, setCaller] = useState(null)

    this.caller = caller;
    this.setCaller = setCaller;

    const [title, setTitle] = useState(["", ""])

    this.addShowed = addShowed
    this.setAddShowed = setAddShowed

    this.editShowed = editShowed
    this.setEditShowed = setEditShowed

    this.editedData = editedData
    this.setEditedData = setEditedData

    this.title = title
    this.setTitle = setTitle


    this.createAdd = (title, title2, location) => {
      setAddShowed(true);
      setTitle([title, title2]);
      setCaller(location);
    };

    this.closeAdd = ((event) => { setAddShowed(false); });

    // onClick={(event) => record.openEditSlider(event, record)}
    this.createEdit = ((event, record, title, title2, location) => {
      let newState = Object.fromEntries(Object.keys(record).map((key) => [key, record[key]]));
      setEditedData(newState);

      if (addShowed)
        return;

      setTitle([title, title2]);
      setEditShowed(true);
      setCaller(location);
    });

    this.closeEdit = ((event) => { setEditShowed(false) });
  }

  editMustShowed() {
    return this.editShowed && !this.addShowed;
  }
}
