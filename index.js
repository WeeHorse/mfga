class FormHandler {
    constructor() {
      this.dirtyFields = new Set();
      this.initialState = {};
      this.dirtyNavDisabled = false;
      this.dirtyNavInited = false;
      console.log(this)
    }
  
    async handleSubmit(e) {
      e.preventDefault();
      e.target.classList.add("mfga-processing");
      const result = await fetch(e.target.action, {
        method: e.target.attributes.method.value,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormHandler.objectifyForm(e.target)),
      });
      e.target.classList.remove("mfga-processing");
      if (result.ok) {
        e.target.querySelector('*[type="submit"]').disabled = true;
        window.removeEventListener("beforeunload", this.dirtyNavigationListener.bind(this));
        return result;
      }
    }
  
    setInitialState(state) {
      if (state) {
        this.initialState = state;
      }
    }
  
    watchFormState(e) {
      // console.log(this?.initialState, e.target.name, this?.initialState?.[e.target.name])
      this.initialState[e.target.name] != e.target.value
        ? this.dirtyFields.add(e.target.name)
        : this.dirtyFields.delete(e.target.name);
      e.target.closest("form").querySelector('*[type="submit"]').disabled = this.dirtyFields.size === 0;
      this.preventDirtyNavigation();
      console.log(this.dirtyFields)
    }
  
    disableDirtyNavigation() {
      this.dirtyNavDisabled = false;
    }
  
    preventDirtyNavigation() {
      if (this.dirtyNavInited || this.dirtyNavDisabled) return;
      this.dirtyNavInited = true;
      window.addEventListener("beforeunload", this.dirtyNavigationListener.bind(this));
    }
  
    dirtyNavigationListener(event) {
      if (this.dirtyFields.size !== 0) {
        event.preventDefault();
        event.returnValue = "";
      }
    }
  
    static objectifyForm(form) {
      const obj = {};
      for (let elem of form.elements) {
        switch (elem.type) {
          case "radio":
            if (!obj[elem.name]) {
              obj[elem.name] = elem.checked ? elem.value : null;
            }
            break;
          case "checkbox":
            if (form[elem.name].length) {
              if (!obj[elem.name]?.push) {
                obj[elem.name] = [];
              }
              if (elem.checked) {
                obj[elem.name].push(elem.value);
              }
            } else {
              if (elem.checked) {
                obj[elem.name] = elem.value;
              }
            }
            break;
          case "select-multiple":
            if (!obj[elem.name]?.push) {
              obj[elem.name] = [];
            }
            for (let option of elem.options) {
              if (option.selected) {
                obj[elem.name].push(option.value);
              }
            }
            break;
          case "submit":
            // don't capture it
            break;
          case "fieldset":
            // don't capture it
            break;
          default:
            obj[elem.name] = elem.value ? elem.value : null;
            break;
        }
      }
  
      return obj;
    }
  }
  
  export default FormHandler;
  