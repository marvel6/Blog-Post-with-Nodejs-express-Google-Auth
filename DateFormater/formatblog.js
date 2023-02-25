const moment = require('moment')


module.exports = {
    formatDate: (date, formater) => {
        return moment(date).format(formater)
    },
    truncate: (str, len) => {
        if (str.length > len && str.length > 0) {

            let newStr = str + " "
            newStr = str.substr(0, len)
            newStr = str.substr(0, newStr.lastIndexOf(' '))
            newStr = newStr.length > 0 ? newStr : newStr.substr(0, len)
            return newStr + '...'
        }

        return str
    },

    replace: (input) => {
        return input.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g,' ')
    },
    editIcon:(storyUser,loggedUser,storyId,floating = true) => {

        if(storyUser._id.toString() === loggedUser._id.toString()){
            if(floating){
                return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
            }else{
                return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
            }
        }else{
            return ' '
        }
        
    },

    select: (selected,option) => {
        return option
        .fn(this)
        .replace(
            new RegExp('value="' + selected + '"'),
            '$& selected ="selected"'
        ).replace(
            new RegExp('>' + selected + '</option>'),
            'selected="selected"$&'
        )
    }


};


