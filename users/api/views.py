from django.contrib.auth.models import User
from ..models import UserProfile
from rest_framework.authtoken.models import Token
from rest_framework_jwt.settings import api_settings
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
from rest_framework.response import Response
from rest_framework import generics, views
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)
from .serializers import (
    UserCreateSerializer,
    UserLoginSerializer,
    UserTokenSerializer,
    UserDetailSerializer,
    UserSerializer,
)

class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        registerData = request.data
        serializer_class = UserCreateSerializer(data=request.data)

        if serializer_class.is_valid():
            print(registerData)
        else:
            print(serializer_class.errors)
            return Response({
                'status': 500,
                'errors': serializer_class.errors,
                # 'data': response.data
            })
            # # response = super().create(request, *args, **kwargs)
            # username = registerData['username']
            # email = registerData['email']
            # password = registerData['password']

            # print(password)
            # user = User(
            # username = username,
            # email = email
            # )

            # user.set_password(password)

            # print(user)
            # user.save()
            # profile = UserProfile(
            #     user = user,
            #     avatar = registerData['avatar'],
            #     name = registerData['name'],
            #     bio = registerData['bio'],
            #     status = "Member",
            #     fav_quote = registerData['fav_quote']
            # )
            #     # # print(profile)
            # profile.save()
            #     # return profile


class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
class UserDetailAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    lookup_field = 'id'
    permission_classes = [AllowAny]
class UserLoginAPIView(views.APIView):
    permission_classes = [AllowAny]
    serializer_class = UserLoginSerializer
    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = UserTokenSerializer(
        data=request.data,
        context={'request': request}
        )
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data['user']
            token= jwt_encode_handler(jwt_payload_handler(user))
            return Response({
                'token': token,
            }, status=200)
        return Response(serializer.errors, status=400)