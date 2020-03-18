import { checkPermissions, accessControlFn } from "../accessControl";

describe(`Check permissions`, () => {
  const testPermissionObjAccess = {
    userPermissions: [
      { authority: "ROLE_VCM" },
      { authority: "ROLE_CREATE_USER" }
    ],
    allowedPermissions: ["ROLE_VCM"]
  };
  const testPermissionObjNoAccess = {
    userPermissions: [
      { authority: "ROLE_VCM" },
      { authority: "ROLE_CREATE_USER" }
    ],
    allowedPermissions: ["ROLE_VCM2"]
  };

  it(`should return true`, () => {
    expect(
      checkPermissions(
        testPermissionObjAccess.userPermissions,
        testPermissionObjAccess.allowedPermissions
      )
    ).toEqual(true);
  });

  it(`should return false`, () => {
    expect(
      checkPermissions(
        testPermissionObjNoAccess.userPermissions,
        testPermissionObjNoAccess.allowedPermissions
      )
    ).toEqual(false);
  });
});

describe(`Access control`, () => {
  const testPermissionObjAccess = {
    userPermissions: [
      { authority: "ROLE_VCM" },
      { authority: "ROLE_CREATE_USER" }
    ],
    allowedPermissions: ["ROLE_VCM"]
  };

  const fn = jest.fn();
  it(`should call fn`, () => {
    accessControlFn(
      testPermissionObjAccess.userPermissions,
      testPermissionObjAccess.allowedPermissions,
      fn
    );
    expect(fn).toHaveBeenCalled();
  });
});
