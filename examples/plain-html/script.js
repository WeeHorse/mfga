import { watchFormState, handleSubmit, handleFiles } from '../../index.js'
window.handleSubmit = handleSubmit // expose MFG(a) submit handler to HTML-scope
window.watchFormState = watchFormState // expose MFG(a) form state handler to HTML-scope
window.handleFiles = handleFiles // expose file handler to HTML-scope
