import { extractLink, formatDateByLocale } from "../../src/lib/helpers";

describe('extractLink', () => {
  const link = 'www.example.com?utm_source=facebook&utm_medium=cpc&utm_campaign=sale_2020&utm_term=visitors-90d&utm_content=image-101';

  test('should extract link with www only in the string', () => {
    // Act
    const result = extractLink(link)
    const expected = 'www.example.com?utm_source=facebook&utm_medium=cpc&utm_campaign=sale_2020&utm_term=visitors-90d&utm_content=image-101';

    // Assert
    expect(result).toEqual(expected);
  });

  test('should extract link with http://', () => {
    // Act
    const result = extractLink('http://' + link)
    const expected = 'http://' + link;

    // Assert
    expect(result).toEqual(expected);
  });

  test('should extract link with https://', () => {
    // Act
    const result = extractLink('https://' + link)
    const expected = 'https://' + link;

    // Assert
    expect(result).toEqual(expected);
  });

  test('should should extract link with https:// and additional words', () => {
    // Act
    const result = extractLink('glaba https://' + link + ' you can visit this website for further assistance')
    const expected = 'https://' + link;

    // Assert
    expect(result).toEqual(expected);
  });

  test('should return the link when some other words are added', () => {
    // Act
    const result = extractLink('glaba https:// some https inserted before link' + link + ' you can visit this website for further assistance')

    // Assert
    expect(result).toEqual(link);
  });

  test('should not return link when there is only https is included in string', () => {
    // Act
    const result = extractLink('glaba https:// some broken link you can visit this website for further assistance')
    const expected = '';

    // Assert
    expect(result).toEqual(expected);
  });

  test('should return empty string if no link is found', () => {
    // Act
    const result = extractLink('glaba wwww some broken link you can visit this website for further assistance');
    const expected = '';

    // Assert
    expect(result).toEqual(expected);
  });

  test('should return empty string if no link is found', () => {
    // Act
    const result = extractLink('glaba wwww some broken link you can visit yourketo.diet this website for further assistance');
    const expected = '';

    // Assert
    expect(result).toEqual(expected);
  });

  test('should extract link with https://', () => {
    // Act
    const result = extractLink('glaba wwww some broken link you can visit https://yourketo.diet this website for furtger assistance');
    const expected = 'https://yourketo.diet';

    // Assert
    expect(result).toEqual(expected);
  });

  test('should extract link with http://', () => {
    // Act
    const result = extractLink('glaba wwww some broken link you can visit http://yourketo.diet this website for furtger assistance');
    const expected = 'http://yourketo.diet';

    // Assert
    expect(result).toEqual(expected);
  });

  test('should extract link with www', () => {
    // Act
    const result = extractLink('glaba wwww healthy link you can visit www.yourketo.diet this website for further assistance');
    const expected = 'www.yourketo.diet';

    // Assert
    expect(result).toEqual(expected);
  });
})
