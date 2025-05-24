  <div className="flex flex-wrap gap-4 justify-center">
    {users.map((user) => (
      <UserCard key={user._id} user={user} isFeedView={true} />
    ))}
  </div> 