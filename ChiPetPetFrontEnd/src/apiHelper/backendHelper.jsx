import {
  getFetcher,
  postFetcher,
  putFetcher,
  patchFetcher,
  deleteFetcher,
} from "./apiHelper";
import * as url from "./urlHelper";

/**
 * @author Faruk Uçgun
 * @date 11.12.2023
 * @abstract: This file is responsible for making requests to backend
 */

// application
export const getApplicationsAdmin = async () => {
  return await getFetcher(url.GET_APPLICATIONS_ADMIN_PATH());
};

export const getApplicationByAdopter = async (adopterId) => {
  return await getFetcher(url.GET_APPLICATION_BY_ADOPTER_PATH(adopterId));
};

export const getApplicationByShelter = async (shelterId) => {
  return await getFetcher(url.GET_APPLICATION_BY_SHELTER_PATH(shelterId));
};

export const getApplicationByPet = async (petId) => {
  return await getFetcher(url.GET_APPLICATION_BY_PET_PATH(petId));
};

export const getApplication = async (applicationId) => {
  return await getFetcher(url.GET_APPLICATION_PATH(applicationId));
};

export const createApplication = async (data) => {
  return await postFetcher(url.CREATE_APPLICATION_PATH(), data);
};

export const updateApplication = async (data) => {
  return await putFetcher(url.UPDATE_APPLICATION_PATH(), data);
};

export const updateApplicationStatus = async (data) => {
  return await putFetcher(url.UPDATE_APPLICATION_STATUS_PATH(), data);
};

export const deleteApplication = async (applicationId) => {
  return await deleteFetcher(url.DELETE_APPLICATION_PATH(applicationId));
};

// appointment
export const getAppointment = async (appointmentId) => {
  return await getFetcher(url.GET_APPOINTMENT_PATH(appointmentId));
};

export const getAppointmentByUser = async (userId) => {
  return await getFetcher(url.GET_APPOINTMENT_BY_USER_PATH(userId));
};

export const getAppointmentByVeterinarian = async (veterinarianId) => {
  return await getFetcher(url.GET_APPOINTMENT_BY_VETERINARIAN_PATH(veterinarianId));
};

export const createAppointment = async (data) => {
  return await postFetcher(url.CREATE_APPOINTMENT_PATH(), data);
};

export const updateAppointment = async (data) => {
  return await putFetcher(url.UPDATE_APPOINTMENT_PATH(), data);
};

export const deleteAppointment = async (appointmentId) => {
  return await deleteFetcher(url.DELETE_APPOINTMENT_PATH(appointmentId));
};

export const getVeterinarianAppointmentDates = async (veterinarianId) => {
  return await getFetcher(url.GET_VETERINARIAN_APPOINTMENT_DATES_PATH(veterinarianId));
};

// notification
export const getNotifications = async (user_id) => {
  return await getFetcher(url.GET_NOTIFICATIONS_PATH(user_id));
};

export const getNotification = async (user_id, date_and_time) => {
  return await getFetcher(
    url.GET_NOTIFICATION_PATH(user_id, date_and_time)
  );
};

export const getRecentNotifications = async (user_id, date_and_time) => {
  return await getFetcher(
    url.GET_RECENT_NOTIFICATIONS_PATH(user_id, date_and_time)
  );
};

export const deleteNotification = async (user_id, date_and_time) => {
  return await deleteFetcher(
    url.DELETE_NOTIFICATION_PATH(user_id, date_and_time)
  );
};

// health record
export const uploadHealthRecord = async (data) => {
  return await postFetcher(url.UPLOAD_HEALTH_RECORD_PATH(), data);
};

export const getHealthRecordsByPet = async (pet_id) => {
  return await getFetcher(url.GET_HEALTH_RECORDS_BY_PET_PATH(pet_id));
};

// pet create
export const insertPet = async () => {
  return await postFetcher(url.INSERT_PET_PATH());
};

export const insertPetsFromExcel = async (data) => {
  return await postFetcher(url.INSERT_PETS_FROM_EXCEL_PATH(), data);
};

export const getPetsByShelter = async (user_id) => {
  return await getFetcher(url.GET_PETS_BY_SHELTER_PATH(user_id));
};

export const getPetsByType = async (type) => {
  return await getFetcher(url.GET_PETS_BY_TYPE_PATH(type));
};

export const getPetById = async (petid) => {
  return await getFetcher(url.GET_PET_BY_ID_PATH(petid));
};

export const getPetsByAdopterId = async (adopter_id) => {
  return await getFetcher(url.GET_PETS_BY_ADOPTER_ID_PATH(adopter_id));
};

export const getPetsByAdopterIdForShelter = async (adopter_id) => {
  return await getFetcher(url.GET_PETS_BY_ADOPTER_ID_FOR_SHELTER_PATH(adopter_id));
}

export const getPetsByVeterinarian = async (vetid) => {
  return await getFetcher(url.GET_PETS_BY_VETERINARIAN_PATH(vetid));
}

// verification documents

export const getUnverifiedDocuments = async () => {
  return await getFetcher(url.GET_UNVERIFIED_DOCUMENTS_PATH());
};

export const uploadVerificationDocument = async (formData) => {
  return await postFetcher(url.UPLOAD_VERIFICATION_DOCUMENT_PATH(), formData);
};

export const getOwnVerificationDocuments = async (user_id) => {
  return await getFetcher(url.GET_OWN_VERIFICATION_DOCUMENTS_PATH(user_id));
};

export const verifyUser = async (data) => {
    return await putFetcher(url.VERIFY_USER_PATH(), data);
}

export const rejectVerificationRequest = async (data) => {
  return await putFetcher(url.REJECT_VERIFICATION_REQUEST_PATH(), data);
}

// login register
export const register = async () => {
    return await postFetcher(url.REGISTER_PATH());
}

export const login = async () => {
    return await postFetcher(url.LOGIN_PATH());
}

export const resetPassword = async () => {
    return await putFetcher(url.RESET_PASSWORD_PATH());
}

export const changePassword = async () => {
    return await putFetcher(url.CHANGE_PASSWORD_PATH());
}

export const getShelterById = async (user_id) => {
  return await getFetcher(url.GET_SHELTER_BY_ID_PATH(user_id));
};

export const getAllShelters = async () => {
  return await getFetcher(url.GET_ALL_SHELTERS_PATH());
};

export const getAllVeterinarians = async () => {
  return await getFetcher(url.GET_ALL_VETERINARIANS_PATH());
};

export const changeUserInfo = async (data) => {
  return await putFetcher(url.CHANGE_USER_INFO_PATH(), data);
}

export const getAddressAndContact = async (userid, role) => {
  return await getFetcher(url.GET_ADDRESS_AND_CONTACT_PATH(userid, role));
};

export const changeAddressAndContact = async (data) => {
  return await putFetcher(url.CHANGE_ADDRESS_AND_CONTACT_PATH(), data);
}

// message
export const getMessages = async () => {
  return await getFetcher(url.GET_MESSAGES_PATH(user_id));
};

export const getAfterMessages = async (date, user_id) => {
  return await getFetcher(url.GET_AFTER_MESSAGES_PATH(date, user_id));
};
export const sendMessage = async () => {
  return await postFetcher(url.SEND_MESSAGE_PATH());
};

// blogpost
export const getTopics = async () => {
  return await getFetcher(url.TOPIC_PATH());
};

export const getTopicBlogs = (topic) => async () => {
  return await getFetcher(url.GET_TOPIC_BLOGS_PATH(topic));
};

export const createBlog = () => async () => {
  return await postFetcher(url.CREATE_BLOG_PATH());
};

export const createComment = () => async () => {
  return await postFetcher(url.CREATE_COMMENT_PATH());
};

export const getBlogComments = (post_id) => async () => {
  return await getFetcher(url.GET_BLOG_COMMENTS_PATH(post_id));
};

export const updateBlog = () => async () => {
  return await patchFetcher(url.UPDATE_BLOG_PATH());
};

export const updateComment = () => async () => {
  return await patchFetcher(url.UPDATE_COMMENT_PATH());
};

export const deleteBlog = (post_id, user_id) => async () => {
  return await deleteFetcher(url.DELETE_BLOG_PATH(post_id, user_id));
};

export const deleteComment = (post_id, comment_id, user_id) => async () => {
    return await deleteFetcher(
      url.DELETE_COMMENT_PATH(post_id, comment_id, user_id)
    );
  };

  // system report 
  export const getTopVets = async () => {
    return await getFetcher(url.GET_TOP_VETS_PATH());
  };

  export const getTopAdopters = async () => {
    return await getFetcher(url.GET_TOP_ADOPTERS_PATH());
  };

  export const getTopShelters = async () => {
    return await getFetcher(url.GET_TOP_SHELTERS_PATH());
  };

  export const getMostAdoptedBreed = async () => {
    return await getFetcher(url.GET_MOST_ADOPTED_BREED_PATH());
  };