interface UserInfoProps {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  userID: string | null;
}

const UserInfo = ({ firstName, lastName, email, userID }: UserInfoProps) => (
  <div className="flex flex-col gap-2 p-2 hover:bg-blue-100 cursor-pointer rounded-md">
    <div className="flex gap-1 justify-center">
      <h4 className="text-lg sm:text-base font-medium sm:font-normal text-gray-600">
        {firstName}
      </h4>
      <h5 className="text-lg sm:text-base font-medium sm:font-normal text-gray-600">
        {lastName}
      </h5>
    </div>
    <div className="flex flex-col gap-1 justify-center">
      <p className="text-sm text-gray-400">{email}</p>
      <p className="text-xs text-gray-400">
        <b>ID: </b>
        {userID}
      </p>
    </div>
  </div>
);

export default UserInfo;