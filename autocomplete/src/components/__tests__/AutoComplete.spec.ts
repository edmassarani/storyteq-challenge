import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AutoComplete from '../AutoComplete.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(AutoComplete, { props: { placeholder: 'Hello World!' } })
    expect(wrapper.get('input').element.getAttribute('placeholder')).toBe('Hello World!')
  })
})
