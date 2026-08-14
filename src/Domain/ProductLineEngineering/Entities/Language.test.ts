import {Language} from "./Language";


test('The constructor should give the right values', () => {

  let language = new Language('uuid-345','test_name','owner-id-123','domain', 'published');

  expect(language.uuid).toBe('uuid-345');
  expect(language.name).toBe('test_name');
  expect(language.type).toBe('domain');
  expect(language.status).toBe('published');
});


