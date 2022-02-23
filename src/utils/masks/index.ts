import { FormEvent } from "react";

export function cnpjMask(e: FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 17;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "")
  value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d)/, "$1.$2.$3/$4-$5");
  e.currentTarget.value = value
  return e;
}