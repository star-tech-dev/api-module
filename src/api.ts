import axios, { AxiosRequestConfig } from 'axios'

interface APINormalizedProps {
  baseURL: string
}

type APIProps = string | APINormalizedProps

function normalizeProps (input: APIProps): APINormalizedProps {
  return typeof input === 'string'
    ? { baseURL: input }
    : input
}

export class API {
  public baseURL: string

  constructor(props: APIProps) {
    props = normalizeProps(props)
    this.baseURL = props.baseURL || ''
  }

  sendRequest (options: AxiosRequestConfig): Promise<any> {
    const mergedOptions = {
      method: 'get',
      withCredentials: true,
      ...options,
    } as AxiosRequestConfig

    mergedOptions.headers = mergedOptions.headers || {}
    mergedOptions.url = `${this.baseURL}${options.url}`

    if (
      mergedOptions.method &&
      ['get', 'delete'].includes(mergedOptions.method) &&
      Object.prototype.hasOwnProperty.call(mergedOptions, 'data')
    ) {
      mergedOptions.params = options.data
      delete mergedOptions.data
    }

    return axios(mergedOptions)
      .then(res => res.data)
      .catch(err => {
        throw err
      })
  }
}
