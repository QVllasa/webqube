export interface IMail{
  to: string[],
  message: {
    text: string,
    subject: string,
    html: string,
  }
}
