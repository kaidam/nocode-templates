const autoCopyrightMessage = ({
  company_name,
}) => {
  return `© ${new Date().getFullYear()} ${company_name}`
}

export default {
  autoCopyrightMessage,
}