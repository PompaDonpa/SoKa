const pass = { pass: true }
const notPass = message => ({ pass: false, error: `Invalid ${message}.` })

const checkJSONB = obj => {
  try {
    JSON.parse(obj)
  } catch (e) {
    return true
  }
  return false
}

const checkEmail = email => {
  return email.split('').filter(char => char === '@').length === 1
}

const nameCheckFailed = name => {
  return typeof name !== 'string' || !name.trim()
}
const lastnameCheckFailed = lastname => {
  return typeof lastname !== 'string' || !lastname.trim()
}
const emailCheckFailed = email => {
  return (
    typeof email !== 'string' ||
    !email.trim() ||
    email.length > 100 ||
    !checkEmail(email)
  )
}
const usernameCheckFailed = username => {
  return (
    typeof username !== 'string' || !username.trim() || username.length > 16
  )
}
const passwordCheckFailed = password => {
  return (
    typeof password !== 'string' || !password.trim() || password.length > 64
  )
}
const locationCheckFailed = location => {
  return typeof location !== 'string' || !location.trim()
}
const genderCheckFailed = gender => {
  return typeof gender !== 'string' || !gender.trim()
}
const imageCheckFailed = image => {
  return (
    typeof image !== 'string' ||
    image.length < 11 ||
    (image.slice(0, 7) !== 'http://' && image.slice(0, 8) !== 'https://')
  )
}
const interestsCheckFailed = interests => {
  return (
    typeof interests !== 'string' || !interests.trim() || checkJSONB(interests)
  )
}
const requestsCheckFailed = requests => {
  return (
    typeof requests !== 'string' || !requests.trim() || checkJSONB(requests)
  )
}
const goalsCheckFailed = goals => {
  return typeof goals !== 'string' || !goals.trim() || checkJSONB(goals)
}
const karmaCheckFailed = karma => {
  return (
    typeof karma !== 'number' ||
    isNaN(karma) ||
    Number(karma) <= 0 ||
    Number(karma) > 5
  )
}
const badgesCheckFailed = badges => {
  return typeof badges !== 'boolean'
}

const postCheck = (req, res, next) => {
  const verifyUser = ({
    name,
    lastname,
    email,
    username,
    pw_hsp,
    location,
    gender,
    image,
    interests,
    requests,
    goals,
    karma,
    badges
  }) => {
    if (nameCheckFailed(name)) return notPass(name? 'name' : 'name not found!')
    if (lastnameCheckFailed(lastname)) return notPass(lastname? 'lastname' : 'lastname not found!')
    if (emailCheckFailed(email)) return notPass(email? 'email, it must contain one @' : 'email not found!')
    if (usernameCheckFailed(username)) return notPass(username? 'username' : 'username not found!')
    if (passwordCheckFailed(pw_hsp)) return notPass(password? 'password' : 'password not found!')
    if (locationCheckFailed(location)) return notPass(location? 'location' : 'location not found!')
    if (genderCheckFailed(gender)) return notPass(gender? 'gender' : 'gender not found!')
    if (imageCheckFailed(image)) return notPass(image? 'image link, it must begin with http:// or https://' : 'image not found!')
    if (interestsCheckFailed(interests)) return notPass(interests? 'interests it must be type JSON' : 'interests not found!')
    if (requestsCheckFailed(requests)) return notPass(requests? 'requests it must be type JSON' : 'requests not found!')
    if (goalsCheckFailed(goals)) return notPass(goals? 'goals it must be type JSON' : 'goals not found!')
    if (karmaCheckFailed(karma)) return notPass(karma? 'karma it must be a number' : 'karma not found!')
    if (badgesCheckFailed(badges)) return notPass(badges? 'badges it must be type Boolean' : 'badges not found!')

    return pass
  }

  if (!req.body.length) {
    const result = verifyUser(req.body)
    return result.pass ? next() : res.status(400).json({ error: result.error })
  }

  for (let i = 0; i < req.body.length; i++) {
    const result = verifyU(req.body[i])
    if (!result.pass)
      return res.status(400).json({ error: result.error, index: i })
  }

  next()
}

const putCheck = (req, res, next) => {
  const verifyUser = user => {
    const {
      name,
      lastname,
      email,
      username,
      pw_hsp,
      location,
      gender,
      image,
      interests,
      requests,
      goals
    } = user
    const keys = Object.keys(user)
    let count = 0

    if (keys.includes('name')) {
      if (nameCheckFailed(name)) return notPass('name')
      count++
    }
    if (keys.includes('lastname')) {
      if (priceCheckFailed(lastname)) return notPass('lastname')
      count++
    }
    if (keys.includes('email')) {
      if (priceCheckFailed(email)) return notPass('email')
      count++
    }
    if (keys.includes('username')) {
      if (priceCheckFailed(username)) return notPass('username')
      count++
    }
    if (keys.includes('pw_hsp')) {
      if (priceCheckFailed(pw_hsp)) return notPass('password')
      count++
    }
    if (keys.includes('location')) {
      if (priceCheckFailed(location)) return notPass('location')
      count++
    }
    if (keys.includes('gender')) {
      if (priceCheckFailed(gender)) return notPass('gender')
      count++
    }
    if (keys.includes('image')) {
      if (imageCheckFailed(image))
        return notPass('image link, it should begin with http:// or https://')
      count++
    }
    if (keys.includes('interests')) {
      if (categoryCheckFailed(interests)) return notPass('interests')
      count++
    }
    if (keys.includes('requests')) {
      if (categoryCheckFailed(requests)) return notPass('requests')
      count++
    }
    if (keys.includes('goals')) {
      if (categoryCheckFailed(goals)) return notPass('goals')
      count++
    }
    return count > 0
      ? pass
      : notPass('Missing data, required data not found :(')
  }

  const { ids } = req.params
  if (!ids.includes(',') && !req.body.length) {
    const result = verifyUser(req.body)
    return result.pass ? next() : res.status(400).json({ error: result.error })
  }

  if (ids.split(',').length !== req.body.length)
    return res
      .status(400)
      .json({ error: 'Number of ids does not match number of inputs.' })

  for (let i = 0; i < req.body.length; i++) {
    const result = verifyUser(req.body[i])
    if (!result.pass)
      return res.status(400).json({ error: result.error, index: i })
  }

  next()
}

module.exports = {
  postCheck,
  putCheck
}
