function parseExpression(source) {
  const pipeIndex = source.lastIndexOf('|');
  return pipeIndex === -1 ?
    {
      type: 'Reference',
      name: source.trim()
    } : {
      type: 'Filter',
      name: source.substring(pipeIndex + 1).trim(),
      arg: parseExpression(source.substring(0, pipeIndex))
    };
}

function parse(pattern) {
  let beginIndex = pattern.indexOf('{');
  let endIndex = 0;

  const parts = [];

  while (-1 < beginIndex && beginIndex < pattern.length) {
    if (beginIndex > endIndex) {
      parts.push({
        type: 'Text',
        value: pattern.substring(endIndex, beginIndex)
      });
    }

    endIndex = pattern.indexOf('}', beginIndex);

    if (endIndex === -1) {
      throw new Error('Unclosed pattern');
    }

    parts.push(
      parseExpression(pattern.substring(beginIndex + 1, endIndex))
    );

    beginIndex = pattern.indexOf('{', ++endIndex);
  }

  if (endIndex < pattern.length) {
    parts.push({
      type: 'Text',
      value: pattern.substring(endIndex)
    });
  }

  return parts;
}

module.exports = parse;
