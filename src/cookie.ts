import 'core-js/features/string/starts-with';

export const getItem = (sKey: string): string | null => {
  if (!sKey) {
    return null;
  }
  const aCookie: string[] = document.cookie.split(';');
  const sKeySign = `${encodeURIComponent(sKey)}=`;

  for (let i = 0; i < aCookie.length; i++) {
    const tmp = aCookie[i].trim();

    if (tmp.startsWith(sKeySign)) {
      return decodeURIComponent(tmp.substring(sKeySign.length));
    }
  }
  return null;
};

export interface CookieConfig {
  path?: string;
  domain?: string;
  end?: number | string | Date;
  secure?: boolean;
}

export const setItem = (sKey: string, sVal: string, oConfig?: CookieConfig): boolean => {
  if (!sKey || /^expires|max-age|domain|path|secure$/.test(sKey)) {
    return false;
  }

  const aCookie = [`${encodeURIComponent(sKey)}=${encodeURIComponent(sVal)}`];

  const vEnd = oConfig?.end;
  if (vEnd) {
    switch (vEnd.constructor) {
      case Number:
        aCookie.push(vEnd === Infinity ? `expires=${new Date(9999, 11, 31)}` : `max-age:${vEnd}`);
        break;
      case Date:
        aCookie.push(`expires=${(vEnd as Date).toUTCString()}`);
        break;
      case String:
        aCookie.push(`expires=${vEnd}`);
        break;
      default:
        break;
    }
  }

  oConfig?.domain && aCookie.push(`domain=${oConfig.domain}`);
  oConfig?.path && aCookie.push(`path=${oConfig.path}`);
  oConfig?.secure && aCookie.push('secure');

  document.cookie = aCookie.join('; ');
  return true;
};

export const removeItem = (sKey: string, sPath?: string, sDomain?: string): boolean => {
  if (!sKey) {
    return false;
  }

  const sCookie = [`${encodeURIComponent(sKey)}=`, `expires=${new Date(1970, 0, 1).toUTCString()}`];

  sPath && sCookie.push(`path=${sPath}`);
  sDomain && sCookie.push(`domain=${sDomain}`);

  document.cookie = sCookie.join('; ');
  return true;
};

export const hasItem = (sKey: string): boolean => {
  if (!sKey) {
    return false;
  }

  return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
};
