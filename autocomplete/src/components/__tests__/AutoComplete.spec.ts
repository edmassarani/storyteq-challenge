import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AutoComplete from '../AutoComplete.vue'

describe('AutoComplete', () => {
  it('renders properly', () => {
    const wrapper = mount(AutoComplete, { props: { placeholder: 'Hello World!', options: [] } })
    expect(wrapper.get('input').element.getAttribute('placeholder')).toBe('Hello World!')
  })

  it('renders options', async () => {
    const wrapper = mount(AutoComplete, {
      props: { placeholder: 'Hello World!', options: ['john', 'jane', 'james'] },
    })
    const input = wrapper.find('input')

    await input.setValue('jam')

    expect(input.element.value).toBe('jam')

    expect(wrapper.find('p').text()).toBe('james')
  })

  it('fills input with selected option', async () => {
    const wrapper = mount(AutoComplete, {
      props: { placeholder: 'Hello World!', options: ['john', 'jane', 'james'] },
    })
    const input = wrapper.find('input')

    await input.setValue('jam')

    expect(input.element.value).toBe('jam')

    const option = wrapper.find('p')

    expect(option.text()).toBe('james')

    await option.trigger('click')

    expect(input.element.value).toBe('james')
  })
})
