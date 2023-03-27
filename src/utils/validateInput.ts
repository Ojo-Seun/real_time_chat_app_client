var psw = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[$#&@_!^=]).{8,9}")

const RegExP = new Map([
  ["username", /^[A-Za-z0-9]{3,20}$/],
  ["email", /^[a-zA-Z0-9_]+@[a-z]+\.[a-z]{2,3}(\.[a-z]{2,3})?$/],
  ["password", psw],
  ["confirmPassword", psw],
  ["image", /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF|svg|SVG)$/],
])

const validateInput = (name: string, value: string) => {
  const valid = RegExP.get(name)?.test(value)
  return valid
}

export default validateInput
