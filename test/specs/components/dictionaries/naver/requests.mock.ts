import { MockRequest } from '@/components/dictionaries/helpers'

export const mockSearchTexts = ['爱', '愛']

export const mockRequest: MockRequest = mock => {
  mock
    .onGet(new RegExp('naver.+' + encodeURIComponent('爱')))
    .reply(
      200,
      new DOMParser().parseFromString(
        require(`raw-loader!./response/爱.html`).default,
        'text/html'
      )
    )

  mock
    .onGet(new RegExp('naver.+' + encodeURIComponent('愛')))
    .reply(
      200,
      new DOMParser().parseFromString(
        require(`raw-loader!./response/愛.html`).default,
        'text/html'
      )
    )
}
