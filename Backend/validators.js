class Field {
    constructor(name, frontName, regexps, errorMsg, inputType, isValid, isRequired) {
        this.name = name
        this.frontName = frontName
        this.regexps = regexps
        this.errorMsg = errorMsg
        this.inputType = inputType
        this.isValid = isValid
        this.isRequired = isRequired
    }
}
// ^.{1,35}$
const formFields = {
    beerFields : {
        name : new Field('name', 'Name', ["^[A-Za-z0-9-/;:!?,' .%]*$", "^[A-Za-z0-9-/;:!?,' .%]{1,35}$"], ["Only letters, whitespace, numbers and characters % - / .", "Beer name should be maximum 35 characters"], "text", false, true),
        tagline : new Field('tagline', 'Tag line', ["^[A-Za-z0-9-/;:!?,' .%]*$", "^[A-Za-z0-9-/;:!?,' .%]{10,35}$"], ["Only letters, whitespace, numbers and charactrs % - .", "10 characters minimum, 35 maximum"], "text", false, true),
        first_brewed : new Field('first_brewed', 'First brewed', ["^[0-9]{4}$"], ["Year in format AAAA"], "number", false, true),
        description : new Field('description', 'Description', ["^[A-Za-z0-9-/;:!?,' .%]*$", "^[A-Za-z0-9-/;:!?,' .%]{40,606}$"], ["Forbidden character detected", "Description should be minimum 40 characters and maximum 606"], "text", false, true),
        image_url : new Field('image_url', 'Image URL', ["^https://images.punkapi.com/v2/[0-9]{1,4}.png"], ["URL image should be like : https://images.punkapi.com/v2/ YOUR IMAGE ID .png"], "url", false, true),
        ph : new Field('ph', 'Beer PH', ["^(1[0-4]|[0-9]{1})$"], ["A PH pattern is between 0 and 14, no decimal"], "number", false, false),
        brewers_tips : new Field('brewers_tips', 'Brewers tips', ["^[A-Za-z0-9-/;:!?,' .%]*$", "^[A-Za-z0-9-/;:!?,' .%]{10,201}$"], ["Forbidden character detected", "Description should be minimum 10 characters and maximum 201"], "text", false, true),
        contributed_by : new Field('contributed_by', 'Contributed by', ["^[A-Za-z0-9-/;:!?,' .%]*$", "^[A-Za-z0-9-/;:!?,' .%]{10,24}$"], ["Forbidden character detected", "Description should be minimum 10 characters and maximum 24"], "text", false, true),
    },
    userFields : {
        lastName : new Field('lastName', 'Last Name', ["^[A-Za-z- ]*$", "^[A-Za-z0-9]{1,255}$"], ["Only letters, whitespace and character -", "Maximum 255 characters"], "text", false, true),
        firstName : new Field('firstName', 'First Name', ["^[A-Za-z- ]*$", "^[A-Za-z0-9-/ .%]{1,255}$"], ["Only letters, whitespace and character -", "Maximum 255 characters"], "text", false, true),
        address : new Field('address', 'Address', ["^[A-Za-z0-9- ]*$", "^[A-Za-z0-9-/ .%]{1,255}$"], ["Only letters, whitespace, numbers and character -", "Maximum 255 characters"], "text", false, true),
        city : new Field('city', 'City', ["^[A-Za-z- ]*$", "^[A-Za-z0-9-/ .%]{1,255}$"], ["Only letters, whitespace and character -", "Maximum 255 characters"], "text", false, true),
        country : new Field('country', 'Country', ["^[A-Za-z- ]*$", "^[A-Za-z0-9-/ .%]{1,255}$"], ["Only letters, whitespace and character -", "Maximum 255 characters"], "text", false, true),
        birth : new Field('birth', 'Birth', ["^(19[0-9]{2}|20[0-9]{2})[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$"], ["Birth should be following this pattern : YYYY-MM-DD, with - separation"], "text", false, true),
        phone : new Field('phone', 'Phone', ["^[0-9 ]+$"], ["Phone accepts only numbers"], "text", false, true),
        email : new Field('email', 'Email', ["^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,8}$"], ["Please enter a valid email address"], "text", false, true),
        password : new Field('password', 'Password', ["^[A-Za-z]*$", "^[A-Za-z0-9]{1,40}$"], ["Only letters, no whitespace, no special character", "Maximum 40 characters"], "text", false, true),
    }
}


module.exports = formFields